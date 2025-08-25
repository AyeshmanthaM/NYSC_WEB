import { Request, Response } from 'express';
import { TranslationService } from '../services/TranslationService';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();
const translationService = new TranslationService(prisma);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const translationController = {
  /**
   * GET /api/translations - Get all translations with filters
   */
  async getTranslations(req: Request, res: Response) {
    try {
      const { namespace, language, search, isActive } = req.query;
      
      const filters = {
        namespace: namespace as string,
        language: language as string,
        search: search as string,
        isActive: isActive ? isActive === 'true' : undefined
      };

      const translations = await translationService.getTranslations(filters);
      
      res.json({
        success: true,
        data: translations,
        total: translations.length
      });
    } catch (error) {
      console.error('Error fetching translations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch translations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * GET /api/translations/:id - Get single translation by ID
   */
  async getTranslationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const translation = await translationService.getTranslationById(id);
      
      if (!translation) {
        return res.status(404).json({
          success: false,
          error: 'Translation not found'
        });
      }

      res.json({
        success: true,
        data: translation
      });
    } catch (error) {
      console.error('Error fetching translation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch translation',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * POST /api/translations - Create new translation
   */
  async createTranslation(req: Request, res: Response) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { namespace, key, language, value } = req.body;
      const userId = (req as any).user?.id; // From auth middleware
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const translation = await translationService.createTranslation({
        namespace,
        key,
        language,
        value,
        userId,
        ipAddress,
        userAgent
      });

      res.status(201).json({
        success: true,
        data: translation,
        message: 'Translation created successfully'
      });
    } catch (error) {
      console.error('Error creating translation:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to create translation',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * PUT /api/translations/:id - Update translation
   */
  async updateTranslation(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const { value } = req.body;
      const userId = (req as any).user?.id;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const translation = await translationService.updateTranslation(id, {
        value,
        userId,
        ipAddress,
        userAgent
      });

      res.json({
        success: true,
        data: translation,
        message: 'Translation updated successfully'
      });
    } catch (error) {
      console.error('Error updating translation:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to update translation',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * PUT /api/translations/bulk - Bulk update translations
   */
  async bulkUpdateTranslations(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { updates } = req.body;
      const userId = (req as any).user?.id;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const results = await translationService.bulkUpdateTranslations(
        updates,
        userId,
        ipAddress,
        userAgent
      );

      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;

      res.json({
        success: true,
        data: results,
        summary: {
          total: results.length,
          successful: successCount,
          errors: errorCount
        },
        message: `Bulk update completed: ${successCount} successful, ${errorCount} errors`
      });
    } catch (error) {
      console.error('Error bulk updating translations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to bulk update translations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * DELETE /api/translations/:id - Delete translation
   */
  async deleteTranslation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const translation = await translationService.deleteTranslation(
        id,
        userId,
        ipAddress,
        userAgent
      );

      res.json({
        success: true,
        data: translation,
        message: 'Translation deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting translation:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to delete translation',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * POST /api/translations/import - Import translations from CSV
   */
  async importTranslations(req: Request, res: Response) {
    const uploadSingle = upload.single('csvFile');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: 'File upload failed',
          details: err.message
        });
      }

      try {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            error: 'No file uploaded'
          });
        }

        const userId = (req as any).user?.id;
        const results = await translationService.importTranslationsFromCSV(
          req.file.path,
          userId
        );

        // Clean up uploaded file
        await fs.unlink(req.file.path);

        res.json({
          success: true,
          data: results,
          message: `Import completed: ${results.success} successful, ${results.errors.length} errors`
        });
      } catch (error) {
        console.error('Error importing translations:', error);
        
        // Clean up file on error
        if (req.file) {
          try {
            await fs.unlink(req.file.path);
          } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
          }
        }

        res.status(500).json({
          success: false,
          error: 'Failed to import translations',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
  },

  /**
   * POST /api/translations/export - Export translations to CSV
   */
  async exportTranslations(req: Request, res: Response) {
    try {
      const { namespace, language, format = 'csv' } = req.body;
      
      const filters = {
        namespace,
        language,
        isActive: true
      };

      const exportDir = path.join(__dirname, '../../exports');
      await fs.mkdir(exportDir, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `translations-export-${timestamp}.${format}`;
      const filePath = path.join(exportDir, filename);

      await translationService.exportTranslationsToCSV(filters, filePath);

      // Send file as download
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              error: 'Failed to download file'
            });
          }
        }

        // Clean up file after download
        fs.unlink(filePath).catch(console.error);
      });
    } catch (error) {
      console.error('Error exporting translations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export translations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * POST /api/translations/sync - Sync all translations to files
   */
  async syncTranslationsToFiles(req: Request, res: Response) {
    try {
      await translationService.syncAllTranslationsToFiles();
      
      res.json({
        success: true,
        message: 'All translations synced to files successfully'
      });
    } catch (error) {
      console.error('Error syncing translations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to sync translations to files',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * GET /api/translations/stats - Get translation statistics
   */
  async getTranslationStats(req: Request, res: Response) {
    try {
      const stats = await translationService.getTranslationStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching translation stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch translation statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * GET /api/translations/completeness - Check translation completeness
   */
  async getTranslationCompleteness(req: Request, res: Response) {
    try {
      const completeness = await translationService.checkTranslationCompleteness();
      
      res.json({
        success: true,
        data: completeness
      });
    } catch (error) {
      console.error('Error checking translation completeness:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to check translation completeness',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};