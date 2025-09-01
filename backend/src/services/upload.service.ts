import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { logger } from '@/config/logger';

export interface UploadResult {
  originalFilename: string;
  filename: string;
  filepath: string;
  url: string;
  size: number;
  mimetype: string;
  uploadedAt: Date;
}

export interface UploadOptions {
  directory?: string;
  maxSize?: number;
  allowedTypes?: string[];
  prefix?: string;
}

class UploadService {
  private uploadBaseDir: string;
  private uploadBaseUrl: string;
  private maxFileSize: number;
  private allowedFileTypes: string[];

  constructor() {
    this.uploadBaseDir = process.env.UPLOAD_DIR || 'uploads';
    this.uploadBaseUrl = process.env.UPLOAD_BASE_URL || '/uploads';
    this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB default
    this.allowedFileTypes = (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,gif')
      .split(',')
      .map(type => type.trim().toLowerCase());
  }

  /**
   * Initialize upload directories
   */
  async initialize(): Promise<void> {
    try {
      // Convert relative path to absolute path
      const absoluteUploadDir = path.resolve(process.cwd(), this.uploadBaseDir);
      
      // Create base upload directory
      await this.ensureDirectoryExists(absoluteUploadDir);
      
      // Create common subdirectories
      const subdirectories = ['profiles', 'directors', 'documents', 'images', 'temp'];
      
      for (const subdir of subdirectories) {
        await this.ensureDirectoryExists(path.join(absoluteUploadDir, subdir));
      }

      logger.info('Upload directories initialized successfully', {
        baseDir: absoluteUploadDir,
        subdirectories,
        maxFileSize: this.maxFileSize,
        allowedTypes: this.allowedFileTypes
      });
    } catch (error) {
      logger.error('Failed to initialize upload directories', { error });
      throw error;
    }
  }

  /**
   * Ensure a directory exists, create if it doesn't
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      logger.info('Created upload directory', { directory: dirPath });
    }
  }

  /**
   * Generate unique filename with timestamp and random hash
   */
  private generateUniqueFilename(originalFilename: string, prefix?: string): string {
    const ext = path.extname(originalFilename).toLowerCase();
    const timestamp = Date.now();
    const randomHash = crypto.randomBytes(8).toString('hex');
    const baseName = prefix ? `${prefix}-${timestamp}-${randomHash}` : `${timestamp}-${randomHash}`;
    
    return `${baseName}${ext}`;
  }

  /**
   * Validate file type and size
   */
  private validateFile(file: Express.Multer.File, options: UploadOptions = {}): void {
    const maxSize = options.maxSize || this.maxFileSize;
    const allowedTypes = options.allowedTypes || this.allowedFileTypes;

    // Check file size
    if (file.size > maxSize) {
      throw new Error(`File size exceeds maximum allowed size of ${maxSize} bytes`);
    }

    // Check file type
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    if (!allowedTypes.includes(fileExt)) {
      throw new Error(`File type .${fileExt} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Additional MIME type check
    const allowedMimeTypes = this.getMimeTypesForExtensions(allowedTypes);
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(`MIME type ${file.mimetype} is not allowed`);
    }
  }

  /**
   * Get allowed MIME types for file extensions
   */
  private getMimeTypesForExtensions(extensions: string[]): string[] {
    const mimeTypeMap: Record<string, string[]> = {
      jpg: ['image/jpeg'],
      jpeg: ['image/jpeg'],
      png: ['image/png'],
      gif: ['image/gif'],
      webp: ['image/webp'],
      pdf: ['application/pdf'],
      doc: ['application/msword'],
      docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      xls: ['application/vnd.ms-excel'],
      xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    };

    return extensions.reduce((acc: string[], ext) => {
      const mimeTypes = mimeTypeMap[ext] || [];
      return [...acc, ...mimeTypes];
    }, []);
  }

  /**
   * Upload a single file
   */
  async uploadFile(file: Express.Multer.File, options: UploadOptions = {}): Promise<UploadResult> {
    try {
      // Validate file
      this.validateFile(file, options);

      // Generate unique filename
      const uniqueFilename = this.generateUniqueFilename(file.originalname, options.prefix);

      // Determine upload directory
      const subDir = options.directory || 'uploads';
      const absoluteUploadDir = path.resolve(process.cwd(), this.uploadBaseDir, subDir);
      
      // Ensure directory exists
      await this.ensureDirectoryExists(absoluteUploadDir);

      // Full file path
      const filepath = path.join(absoluteUploadDir, uniqueFilename);
      const relativeFilepath = path.join(this.uploadBaseDir, subDir, uniqueFilename);

      // Save file
      await fs.writeFile(filepath, file.buffer);

      // Generate URL
      const url = `${this.uploadBaseUrl}/${subDir}/${uniqueFilename}`;

      const result: UploadResult = {
        originalFilename: file.originalname,
        filename: uniqueFilename,
        filepath: relativeFilepath,
        url,
        size: file.size,
        mimetype: file.mimetype,
        uploadedAt: new Date()
      };

      // Log upload
      this.logUpload(result);

      return result;
    } catch (error) {
      logger.error('File upload failed', {
        originalFilename: file.originalname,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(filepath: string): Promise<void> {
    try {
      const absoluteFilepath = path.resolve(process.cwd(), filepath);
      
      // Check if file exists
      await fs.access(absoluteFilepath);
      
      // Delete file
      await fs.unlink(absoluteFilepath);

      logger.info('File deleted successfully', {
        filepath: absoluteFilepath,
        deletedAt: new Date().toISOString()
      });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        logger.warn('Attempted to delete non-existent file', { filepath });
        return; // File doesn't exist, consider it deleted
      }
      
      logger.error('Failed to delete file', {
        filepath,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Log file upload details
   */
  private logUpload(result: UploadResult): void {
    logger.info('File uploaded successfully', {
      originalFilename: result.originalFilename,
      storedFilename: result.filename,
      filepath: result.filepath,
      url: result.url,
      size: result.size,
      mimetype: result.mimetype,
      uploadedAt: result.uploadedAt.toISOString(),
      sizeFormatted: this.formatFileSize(result.size)
    });
  }

  /**
   * Format file size for logging
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get upload statistics
   */
  async getUploadStats(directory?: string): Promise<{
    totalFiles: number;
    totalSize: number;
    directoryPath: string;
  }> {
    try {
      const targetDir = directory 
        ? path.resolve(process.cwd(), this.uploadBaseDir, directory)
        : path.resolve(process.cwd(), this.uploadBaseDir);

      const files = await fs.readdir(targetDir, { withFileTypes: true });
      const fileStats = await Promise.all(
        files
          .filter(file => file.isFile())
          .map(async file => {
            const filePath = path.join(targetDir, file.name);
            const stats = await fs.stat(filePath);
            return stats.size;
          })
      );

      return {
        totalFiles: fileStats.length,
        totalSize: fileStats.reduce((sum, size) => sum + size, 0),
        directoryPath: targetDir
      };
    } catch (error) {
      logger.error('Failed to get upload statistics', { error });
      return {
        totalFiles: 0,
        totalSize: 0,
        directoryPath: directory || this.uploadBaseDir
      };
    }
  }

  /**
   * Clean up temporary files older than specified duration
   */
  async cleanupTempFiles(maxAgeHours: number = 24): Promise<void> {
    try {
      const tempDir = path.resolve(process.cwd(), this.uploadBaseDir, 'temp');
      const files = await fs.readdir(tempDir, { withFileTypes: true });
      const cutoffTime = Date.now() - (maxAgeHours * 60 * 60 * 1000);
      
      let cleanedCount = 0;
      
      for (const file of files) {
        if (file.isFile()) {
          const filePath = path.join(tempDir, file.name);
          const stats = await fs.stat(filePath);
          
          if (stats.mtime.getTime() < cutoffTime) {
            await fs.unlink(filePath);
            cleanedCount++;
          }
        }
      }

      logger.info('Temporary files cleanup completed', {
        cleanedFiles: cleanedCount,
        maxAgeHours,
        tempDirectory: tempDir
      });
    } catch (error) {
      logger.error('Failed to clean up temporary files', { error });
    }
  }
}

// Export singleton instance
export const uploadService = new UploadService();
export default uploadService;