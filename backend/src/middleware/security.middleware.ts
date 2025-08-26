import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { logger } from '@/config/logger';

/**
 * Comprehensive security middleware configuration
 */

// Rate limiting configurations
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: {
      code: 'TOO_MANY_LOGIN_ATTEMPTS',
      message: 'Too many login attempts, please try again later.',
      retryAfter: '15 minutes',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn('Login rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
    });
    
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_LOGIN_ATTEMPTS',
        message: 'Too many login attempts, please try again later.',
        retryAfter: '15 minutes',
      },
    });
  },
  skip: (req: Request) => {
    // Skip rate limiting for test environment
    return process.env.NODE_ENV === 'test';
  },
});

export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn('General rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
    });
    
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests, please try again later.',
      },
    });
  },
  skip: (req: Request) => {
    return process.env.NODE_ENV === 'test';
  },
});

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 API requests per windowMs
  message: {
    error: {
      code: 'API_RATE_LIMIT_EXCEEDED',
      message: 'API rate limit exceeded, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: {
    error: {
      code: 'TOO_MANY_PASSWORD_RESET_ATTEMPTS',
      message: 'Too many password reset attempts, please try again later.',
      retryAfter: '1 hour',
    },
  },
});

// Helmet configuration for security headers
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for Tailwind CSS
        'https://fonts.googleapis.com',
        'https://cdn.tailwindcss.com',
      ],
      fontSrc: [
        "'self'",
        'https://fonts.gstatic.com',
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Required for inline scripts in EJS templates
        "'unsafe-eval'", // Required for development
      ],
      imgSrc: [
        "'self'",
        'data:', // For data URLs (base64 images)
        'https:', // Allow HTTPS images
      ],
      connectSrc: [
        "'self'",
        'https:', // Allow HTTPS connections
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false, // Disable to avoid issues with third-party resources
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
});

/**
 * IP address validation and sanitization
 */
export const ipValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get real IP address considering proxies
    const clientIp = req.ip || 
                    req.connection.remoteAddress || 
                    req.headers['x-forwarded-for'] as string || 
                    req.headers['x-real-ip'] as string;

    // Basic IP validation
    if (clientIp) {
      req.clientIp = clientIp.toString().split(',')[0]?.trim() || req.ip || 'unknown';
      
      // Log suspicious IP patterns
      if (req.clientIp.includes('::ffff:')) {
        req.clientIp = req.clientIp.replace('::ffff:', '');
      }
      
      logger.debug('Client IP processed', { 
        originalIp: clientIp, 
        processedIp: req.clientIp,
        path: req.path,
      });
    }
    
    next();
  } catch (error) {
    logger.error('IP validation error', { error, ip: req.ip });
    next();
  }
};

/**
 * Request sanitization middleware
 */
export const requestSanitization = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Sanitize query parameters
    if (req.query) {
      Object.keys(req.query).forEach(key => {
        if (typeof req.query[key] === 'string') {
          req.query[key] = (req.query[key] as string)
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .replace(/javascript:/gi, '') // Remove javascript: URLs
            .replace(/on\w+\s*=\s*"[^"]*"/gi, '') // Remove event handlers
            .trim();
        }
      });
    }

    // Sanitize request body for non-file uploads
    if (req.body && typeof req.body === 'object' && !req.is('multipart/form-data')) {
      req.body = sanitizeObject(req.body);
    }

    next();
  } catch (error) {
    logger.error('Request sanitization error', { error });
    next(error);
  }
};

/**
 * Recursively sanitize object properties
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
      .trim();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    Object.keys(obj).forEach(key => {
      sanitized[key] = sanitizeObject(obj[key]);
    });
    return sanitized;
  }
  
  return obj;
}

/**
 * Request logging middleware for security auditing
 */
export const securityAuditLog = (req: Request, res: Response, next: NextFunction) => {
  // Log sensitive operations
  const sensitiveRoutes = ['/admin/auth', '/admin/users', '/admin/settings'];
  const isSensitive = sensitiveRoutes.some(route => req.path.startsWith(route));
  
  if (isSensitive || req.method !== 'GET') {
    logger.info('Security audit log', {
      ip: req.clientIp || req.ip,
      method: req.method,
      path: req.path,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer'),
      userId: req.user?.id,
      userRole: req.user?.role,
      timestamp: new Date().toISOString(),
      sensitive: isSensitive,
    });
  }
  
  next();
};

/**
 * User-Agent validation middleware
 */
export const userAgentValidation = (req: Request, res: Response, next: NextFunction): void => {
  const userAgent = req.get('User-Agent');
  
  if (!userAgent) {
    logger.warn('Request without User-Agent header', {
      ip: req.clientIp || req.ip,
      path: req.path,
    });
  }
  
  // Block known malicious user agents
  const maliciousPatterns = [
    /sqlmap/i,
    /nmap/i,
    /nikto/i,
    /acunetix/i,
    /burpsuite/i,
    /masscan/i,
  ];
  
  if (userAgent && maliciousPatterns.some(pattern => pattern.test(userAgent))) {
    logger.warn('Blocked malicious User-Agent', {
      ip: req.clientIp || req.ip,
      userAgent,
      path: req.path,
    });
    
    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Access denied',
      },
    });
    return;
  }
  
  next();
};

/**
 * Admin IP whitelist middleware (optional)
 */
export const adminIpWhitelist = (allowedIps: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Skip in development or if no whitelist configured
    if (process.env.NODE_ENV !== 'production' || allowedIps.length === 0) {
      return next();
    }
    
    const clientIp = req.clientIp || req.ip || 'unknown';
    
    if (!allowedIps.includes(clientIp)) {
      logger.warn('Admin access denied - IP not whitelisted', {
        ip: clientIp,
        path: req.path,
        userAgent: req.get('User-Agent'),
      });
      
      return res.status(403).json({
        success: false,
        error: {
          code: 'IP_NOT_WHITELISTED',
          message: 'Access denied from this location',
        },
      });
    }
    
    next();
  };
};

/**
 * File upload security middleware
 */
export const fileUploadSecurity = (req: Request, res: Response, next: NextFunction) => {
  if (req.files || req.file) {
    const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [req.file];
    
    for (const file of files) {
      if (file) {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          res.status(400).json({
            success: false,
            error: {
              code: 'FILE_TOO_LARGE',
              message: 'File size exceeds 10MB limit',
            },
          });
          return;
        }
        
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          res.status(400).json({
            success: false,
            error: {
              code: 'INVALID_FILE_TYPE',
              message: 'File type not allowed',
            },
          });
          return;
        }
        
        // Scan filename for malicious content
        const maliciousPatterns = [/\.php$/i, /\.exe$/i, /\.bat$/i, /\.cmd$/i, /\.scr$/i];
        if (maliciousPatterns.some(pattern => pattern.test(file.originalname))) {
          logger.warn('Malicious file upload attempt', {
            ip: req.clientIp || req.ip,
            filename: file.originalname,
            mimetype: file.mimetype,
          });
          
          res.status(400).json({
            success: false,
            error: {
              code: 'MALICIOUS_FILE',
              message: 'File type not allowed',
            },
          });
          return;
        }
      }
    }
  }
  
  next();
};

/**
 * Security headers middleware
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

/**
 * CORS security configuration
 */
export const corsConfig = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      process.env.ADMIN_URL || 'http://localhost:5000',
      'http://localhost:3000', // Development fallback
      'http://localhost:3001', // Admin Vue dev server
    ];
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn('CORS origin blocked', { origin });
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cookie',
    'X-CSRF-Token',
  ],
  exposedHeaders: ['X-CSRF-Token'],
};

/**
 * Development-only security bypass
 */
export const devSecurityBypass = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    // Add development-specific headers
    res.setHeader('X-Dev-Environment', 'true');
  }
  next();
};