import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult, ValidationChain } from 'express-validator';
import { logger } from '@/config/logger';
import { Role } from '@prisma/client';

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    logger.warn('Validation failed', {
      errors: errors.array(),
      path: req.path,
      method: req.method,
      ip: req.clientIp || req.ip,
      userId: req.user?.id,
    });
    
    // For API endpoints, return JSON
    if (req.path.startsWith('/api/')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array().map(err => ({
            field: err.type === 'field' ? err.path : err.type,
            message: err.msg,
            value: err.type === 'field' ? err.value : undefined,
          })),
        },
      });
    }
    
    // For admin panel, redirect back with flash messages
    const errorMessages = errors.array().map(err => err.msg);
    req.flash('error', errorMessages);
    
    // Store form data for repopulation
    (req.session as any).formData = req.body;
    
    return res.redirect('back');
  }
  
  next();
};

/**
 * Common validation chains
 */

// User validation
export const validateUserCreate: ValidationChain[] = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s\u0D80-\u0DFF\u0B80-\u0BFF]*$/)
    .withMessage('First name can only contain letters and spaces'),
    
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s\u0D80-\u0DFF\u0B80-\u0BFF]*$/)
    .withMessage('Last name can only contain letters and spaces'),
    
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false })
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
    
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  body('role')
    .optional()
    .isIn(Object.values(Role))
    .withMessage('Invalid user role'),
];

export const validateUserUpdate: ValidationChain[] = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID format'),
    
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s\u0D80-\u0DFF\u0B80-\u0BFF]*$/)
    .withMessage('First name can only contain letters and spaces'),
    
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s\u0D80-\u0DFF\u0B80-\u0BFF]*$/)
    .withMessage('Last name can only contain letters and spaces'),
    
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false })
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
    
  body('role')
    .optional()
    .isIn(Object.values(Role))
    .withMessage('Invalid user role'),
    
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
];

// Authentication validation
export const validateLogin: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false }),
    
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
    
  body('remember')
    .optional()
    .isBoolean()
    .withMessage('Remember me must be a boolean value'),
];

export const validatePasswordReset: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false }),
];

export const validatePasswordChange: ValidationChain[] = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID format'),
    
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

// Query parameter validation
export const validatePagination: ValidationChain[] = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Page must be a number between 1 and 1000')
    .toInt(),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a number between 1 and 100')
    .toInt(),
    
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'firstName', 'lastName', 'email', 'role', 'lastLogin'])
    .withMessage('Invalid sort field'),
    
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be either asc or desc'),
];

export const validateUserFilter: ValidationChain[] = [
  ...validatePagination,
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term is too long')
    .matches(/^[a-zA-Z0-9\s@._-]*$/)
    .withMessage('Search term contains invalid characters'),
    
  query('role')
    .optional()
    .isIn(Object.values(Role))
    .withMessage('Invalid role filter'),
    
  query('active')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Active filter must be true or false'),
];

// Bulk operations validation
export const validateBulkUserAction: ValidationChain[] = [
  body('action')
    .isIn(['activate', 'deactivate', 'make_editor', 'make_user', 'delete'])
    .withMessage('Invalid bulk action'),
    
  body('userIds')
    .isArray({ min: 1, max: 50 })
    .withMessage('Must select between 1 and 50 users')
    .custom((userIds) => {
      if (!userIds.every((id: any) => typeof id === 'string' && id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))) {
        throw new Error('All user IDs must be valid UUIDs');
      }
      return true;
    }),
];

// File upload validation
export const validateFileUpload: ValidationChain[] = [
  body('fileType')
    .optional()
    .isIn(['avatar', 'document', 'image'])
    .withMessage('Invalid file type'),
];

// Profile validation
export const validateProfileUpdate: ValidationChain[] = [
  body('phone')
    .optional()
    .isMobilePhone('si-LK')
    .withMessage('Please provide a valid Sri Lankan phone number'),
    
  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Address is too long'),
    
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City name is too long')
    .matches(/^[a-zA-Z\s\u0D80-\u0DFF\u0B80-\u0BFF]*$/)
    .withMessage('City can only contain letters and spaces'),
    
  body('district')
    .optional()
    .trim()
    .isIn([
      'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
      'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
      'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala',
      'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
      'Trincomalee', 'Vavuniya'
    ])
    .withMessage('Please select a valid Sri Lankan district'),
    
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio is too long (maximum 500 characters)'),
];

// Content validation (for future content management)
export const validateContent: ValidationChain[] = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
    
  body('content')
    .trim()
    .isLength({ min: 10, max: 50000 })
    .withMessage('Content must be between 10 and 50,000 characters'),
    
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Invalid content status'),
    
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category is too long'),
];

// Settings validation
export const validateSettings: ValidationChain[] = [
  body('key')
    .trim()
    .matches(/^[A-Z_][A-Z0-9_]*$/)
    .withMessage('Setting key must be in UPPER_CASE format'),
    
  body('value')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Setting value must be between 1 and 1000 characters'),
    
  body('type')
    .optional()
    .isIn(['string', 'number', 'boolean', 'json'])
    .withMessage('Invalid setting type'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description is too long'),
];

// Email validation
export const validateEmail: ValidationChain[] = [
  body('to')
    .isEmail()
    .withMessage('Invalid recipient email address'),
    
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),
    
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
    
  body('priority')
    .optional()
    .isIn(['high', 'normal', 'low'])
    .withMessage('Invalid email priority'),
];

// API key validation
export const validateApiKey: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('API key name must be between 3 and 100 characters')
    .matches(/^[a-zA-Z0-9\s_-]*$/)
    .withMessage('API key name can only contain letters, numbers, spaces, underscores, and hyphens'),
    
  body('permissions')
    .isArray({ min: 1 })
    .withMessage('At least one permission must be selected')
    .custom((permissions) => {
      const validPermissions = ['read', 'write', 'delete', 'admin'];
      if (!permissions.every((perm: any) => validPermissions.includes(perm))) {
        throw new Error('Invalid permissions specified');
      }
      return true;
    }),
    
  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('Invalid expiration date format')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiration date must be in the future');
      }
      return true;
    }),
];

/**
 * Custom validation middleware factory
 */
export const createValidationMiddleware = (validations: ValidationChain[]) => {
  return [...validations, handleValidationErrors];
};

/**
 * Alias for createValidationMiddleware for compatibility
 */
export const validateRequest = createValidationMiddleware;

/**
 * Sanitization helpers
 */
export const sanitizeHtml = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Basic HTML sanitization (remove script tags, etc.)
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=\s*"[^"]*"/gi, '');
      }
    });
  }
  next();
};

/**
 * MongoDB injection prevention
 */
export const preventNoSQLInjection = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const checkForInjection = (obj: any): boolean => {
      if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (key.startsWith('$') || key.includes('$where')) {
            return true;
          }
          if (typeof obj[key] === 'object' && checkForInjection(obj[key])) {
            return true;
          }
        }
      }
      return false;
    };

    if (checkForInjection(req.body)) {
      logger.warn('Potential NoSQL injection attempt', {
        ip: req.clientIp || req.ip,
        body: req.body,
        path: req.path,
      });
      
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Invalid input detected',
        },
      });
      return;
    }
  }
  
  next();
};