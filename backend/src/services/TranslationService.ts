import { PrismaClient, Translation, TranslationVersion, AuditAction } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import csv from 'csv-parser';
import createCsvWriter from 'csv-writer';

interface TranslationFilter {
  namespace?: string;
  language?: string;
  search?: string;
  isActive?: boolean;
}

interface TranslationUpdate {
  value: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}

interface BulkTranslationUpdate {
  id: string;
  value: string;
}

interface TranslationImportData {
  namespace: string;
  key: string;
  language: string;
  value: string;
}

export class TranslationService {
  private prisma: PrismaClient;
  private frontendLocalesPath: string;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.frontendLocalesPath = path.join(__dirname, '../../../frontend/src/locales');
  }

  /**
   * Get all translations with filtering
   */
  async getTranslations(filters: TranslationFilter = {}) {
    const where: any = {};
    
    if (filters.namespace) where.namespace = filters.namespace;
    if (filters.language) where.language = filters.language;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.search) {
      where.OR = [
        { key: { contains: filters.search, mode: 'insensitive' } },
        { value: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    return await this.prisma.translation.findMany({
      where,
      orderBy: [
        { namespace: 'asc' },
        { key: 'asc' },
        { language: 'asc' }
      ],
      include: {
        versions: {
          orderBy: { version: 'desc' },
          take: 1
        }
      }
    });
  }

  /**
   * Get translation by ID
   */
  async getTranslationById(id: string) {
    return await this.prisma.translation.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { version: 'desc' }
        },
        audits: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });
  }

  /**
   * Update single translation
   */
  async updateTranslation(id: string, updateData: TranslationUpdate) {
    return await this.prisma.$transaction(async (tx) => {
      // Get current translation
      const current = await tx.translation.findUnique({
        where: { id }
      });

      if (!current) {
        throw new Error('Translation not found');
      }

      // Create new version
      const newVersion = current.version + 1;
      await tx.translationVersion.create({
        data: {
          translationId: id,
          version: newVersion,
          value: updateData.value,
          createdBy: updateData.userId
        }
      });

      // Update translation
      const updated = await tx.translation.update({
        where: { id },
        data: {
          value: updateData.value,
          version: newVersion,
          updatedAt: new Date()
        }
      });

      // Create audit log
      await tx.translationAudit.create({
        data: {
          translationId: id,
          action: AuditAction.UPDATE,
          oldValue: current.value,
          newValue: updateData.value,
          userId: updateData.userId,
          ipAddress: updateData.ipAddress,
          userAgent: updateData.userAgent
        }
      });

      // Sync to filesystem
      await this.syncTranslationToFile(updated);

      return updated;
    });
  }

  /**
   * Bulk update translations
   */
  async bulkUpdateTranslations(updates: BulkTranslationUpdate[], userId: string, ipAddress?: string, userAgent?: string) {
    const results = [];

    for (const update of updates) {
      try {
        const result = await this.updateTranslation(update.id, {
          value: update.value,
          userId,
          ipAddress,
          userAgent
        });
        results.push({ id: update.id, success: true, data: result });
      } catch (error) {
        results.push({ 
          id: update.id, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return results;
  }

  /**
   * Create new translation
   */
  async createTranslation(data: {
    namespace: string;
    key: string;
    language: string;
    value: string;
    userId: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return await this.prisma.$transaction(async (tx) => {
      // Check if translation already exists
      const existing = await tx.translation.findUnique({
        where: {
          namespace_key_language: {
            namespace: data.namespace,
            key: data.key,
            language: data.language
          }
        }
      });

      if (existing) {
        throw new Error('Translation already exists for this namespace, key, and language');
      }

      // Create translation
      const translation = await tx.translation.create({
        data: {
          namespace: data.namespace,
          key: data.key,
          language: data.language,
          value: data.value
        }
      });

      // Create initial version
      await tx.translationVersion.create({
        data: {
          translationId: translation.id,
          version: 1,
          value: data.value,
          createdBy: data.userId
        }
      });

      // Create audit log
      await tx.translationAudit.create({
        data: {
          translationId: translation.id,
          action: AuditAction.CREATE,
          newValue: data.value,
          userId: data.userId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        }
      });

      // Sync to filesystem
      await this.syncTranslationToFile(translation);

      return translation;
    });
  }

  /**
   * Delete translation
   */
  async deleteTranslation(id: string, userId: string, ipAddress?: string, userAgent?: string) {
    return await this.prisma.$transaction(async (tx) => {
      const translation = await tx.translation.findUnique({
        where: { id }
      });

      if (!translation) {
        throw new Error('Translation not found');
      }

      // Create audit log before deletion
      await tx.translationAudit.create({
        data: {
          translationId: id,
          action: AuditAction.DELETE,
          oldValue: translation.value,
          userId,
          ipAddress,
          userAgent
        }
      });

      // Soft delete (set isActive to false)
      const deleted = await tx.translation.update({
        where: { id },
        data: { isActive: false }
      });

      // Remove from filesystem
      await this.removeTranslationFromFile(translation);

      return deleted;
    });
  }

  /**
   * Import translations from CSV
   */
  async importTranslationsFromCSV(filePath: string, userId: string): Promise<{
    success: number;
    errors: Array<{ row: number; error: string; data: any }>;
  }> {
    const results = { success: 0, errors: [] as Array<{ row: number; error: string; data: any }> };
    const translations: TranslationImportData[] = [];

    // Parse CSV
    await new Promise<void>((resolve, reject) => {
      let rowIndex = 0;
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          rowIndex++;
          try {
            if (!data.namespace || !data.key || !data.language || !data.value) {
              results.errors.push({
                row: rowIndex,
                error: 'Missing required fields (namespace, key, language, value)',
                data
              });
              return;
            }

            translations.push({
              namespace: data.namespace.trim(),
              key: data.key.trim(),
              language: data.language.trim(),
              value: data.value.trim()
            });
          } catch (error) {
            results.errors.push({
              row: rowIndex,
              error: error instanceof Error ? error.message : 'Parse error',
              data
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Process translations
    for (const translationData of translations) {
      try {
        await this.createTranslation({
          ...translationData,
          userId
        });
        results.success++;
      } catch (error) {
        results.errors.push({
          row: -1,
          error: error instanceof Error ? error.message : 'Create error',
          data: translationData
        });
      }
    }

    return results;
  }

  /**
   * Export translations to CSV
   */
  async exportTranslationsToCSV(filters: TranslationFilter = {}, outputPath: string) {
    const translations = await this.getTranslations(filters);
    
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: 'namespace', title: 'Namespace' },
        { id: 'key', title: 'Key' },
        { id: 'language', title: 'Language' },
        { id: 'value', title: 'Value' },
        { id: 'version', title: 'Version' },
        { id: 'updatedAt', title: 'Updated At' }
      ]
    });

    const records = translations.map(t => ({
      namespace: t.namespace,
      key: t.key,
      language: t.language,
      value: t.value,
      version: t.version,
      updatedAt: t.updatedAt.toISOString()
    }));

    await csvWriter.writeRecords(records);
    return outputPath;
  }

  /**
   * Sync single translation to filesystem
   */
  private async syncTranslationToFile(translation: Translation) {
    const filePath = path.join(
      this.frontendLocalesPath,
      translation.language,
      `${translation.namespace}.json`
    );

    try {
      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Read existing file or create empty object
      let content = {};
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        content = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist or is invalid, start with empty object
      }

      // Update the specific key
      content[translation.key] = translation.value;

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error syncing translation to file: ${error}`);
      throw error;
    }
  }

  /**
   * Remove translation from filesystem
   */
  private async removeTranslationFromFile(translation: Translation) {
    const filePath = path.join(
      this.frontendLocalesPath,
      translation.language,
      `${translation.namespace}.json`
    );

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const content = JSON.parse(fileContent);

      // Remove the key
      delete content[translation.key];

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error removing translation from file: ${error}`);
      // Don't throw error as file might not exist
    }
  }

  /**
   * Sync all translations to filesystem (full rebuild)
   */
  async syncAllTranslationsToFiles() {
    const translations = await this.getTranslations({ isActive: true });
    
    // Group by language and namespace
    const grouped = translations.reduce((acc, translation) => {
      const key = `${translation.language}/${translation.namespace}`;
      if (!acc[key]) {
        acc[key] = {};
      }
      acc[key][translation.key] = translation.value;
      return acc;
    }, {} as Record<string, Record<string, string>>);

    // Write each file
    for (const [pathKey, content] of Object.entries(grouped)) {
      const [language, namespace] = pathKey.split('/');
      const filePath = path.join(this.frontendLocalesPath, language, `${namespace}.json`);
      
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    }
  }

  /**
   * Get translation statistics
   */
  async getTranslationStats() {
    const [totalTranslations, byLanguage, byNamespace, recentlyUpdated] = await Promise.all([
      this.prisma.translation.count({ where: { isActive: true } }),
      
      this.prisma.translation.groupBy({
        by: ['language'],
        where: { isActive: true },
        _count: { _all: true }
      }),
      
      this.prisma.translation.groupBy({
        by: ['namespace'],
        where: { isActive: true },
        _count: { _all: true }
      }),
      
      this.prisma.translation.count({
        where: {
          isActive: true,
          updatedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ]);

    return {
      total: totalTranslations,
      byLanguage: byLanguage.map(item => ({
        language: item.language,
        count: item._count._all
      })),
      byNamespace: byNamespace.map(item => ({
        namespace: item.namespace,
        count: item._count._all
      })),
      recentlyUpdated
    };
  }

  /**
   * Check translation completeness
   */
  async checkTranslationCompleteness() {
    const namespaces = await this.prisma.translationNamespace.findMany({
      where: { isActive: true }
    });
    
    const languages = ['en', 'si', 'ta'];
    const completeness = [];

    for (const namespace of namespaces) {
      const keys = await this.prisma.translation.findMany({
        where: { 
          namespace: namespace.name,
          isActive: true 
        },
        select: { key: true },
        distinct: ['key']
      });

      const uniqueKeys = keys.map(k => k.key);
      
      for (const language of languages) {
        const translatedKeys = await this.prisma.translation.findMany({
          where: {
            namespace: namespace.name,
            language,
            isActive: true,
            value: { not: '' }
          },
          select: { key: true }
        });

        const translatedKeyNames = translatedKeys.map(t => t.key);
        const missing = uniqueKeys.filter(key => !translatedKeyNames.includes(key));

        completeness.push({
          namespace: namespace.name,
          language,
          total: uniqueKeys.length,
          translated: translatedKeyNames.length,
          missing: missing.length,
          missingKeys: missing,
          percentage: uniqueKeys.length > 0 ? (translatedKeyNames.length / uniqueKeys.length) * 100 : 100
        });
      }
    }

    return completeness;
  }
}