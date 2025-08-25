import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to handle express-validator validation results
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined
      }))
    });
  }
  
  next();
};

/**
 * Middleware to validate translation namespace exists
 */
export const validateNamespace = async (req: Request, res: Response, next: NextFunction) => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const namespace = req.body.namespace || req.query.namespace || req.params.namespace;
    
    if (namespace) {
      const existingNamespace = await prisma.translationNamespace.findUnique({
        where: { name: namespace }
      });
      
      if (!existingNamespace) {
        return res.status(400).json({
          success: false,
          error: 'Invalid namespace',
          code: 'INVALID_NAMESPACE',
          details: `Namespace '${namespace}' does not exist`
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Namespace validation error:', error);
    next(); // Continue without validation on error
  }
};

/**
 * Sanitize and normalize translation data
 */
export const sanitizeTranslationData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.value) {
    // Trim whitespace
    req.body.value = req.body.value.trim();
    
    // Remove potentially harmful characters while preserving legitimate content
    req.body.value = req.body.value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Remove control characters
      .replace(/\s+/g, ' '); // Normalize whitespace
  }
  
  if (req.body.key) {
    req.body.key = req.body.key.trim().toLowerCase();
  }
  
  if (req.body.namespace) {
    req.body.namespace = req.body.namespace.trim().toLowerCase();
  }
  
  next();
};

/**
 * Rate limiting for translation updates
 */
export const rateLimit = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Get existing requests for this IP
    let userRequests = requests.get(key) || [];
    
    // Remove old requests outside the window
    userRequests = userRequests.filter(time => now - time < windowMs);
    
    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
    
    // Add current request
    userRequests.push(now);
    requests.set(key, userRequests);
    
    next();
  };
};

/**
 * Validate file upload requirements
 */
export const validateFileUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' && req.path.includes('/import')) {
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid content type for file upload',
        code: 'INVALID_CONTENT_TYPE'
      });
    }
  }
  
  next();
};

/**
 * Validate language parameters
 */
export const validateLanguage = (req: Request, res: Response, next: NextFunction) => {
  const supportedLanguages = ['en', 'si', 'ta'];
  const language = req.body.language || req.query.language || req.params.language;
  
  if (language && !supportedLanguages.includes(language)) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported language',
      code: 'INVALID_LANGUAGE',
      supported: supportedLanguages,
      provided: language
    });
  }
  
  next();
};