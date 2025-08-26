import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log the error
  logger.error('Error caught by global handler', {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
      code: err.code,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      ip: req.clientIp || req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id,
    },
  });

  // Default error values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Database operation failed';
    
    // Handle specific Prisma error codes
    switch (err.code) {
      case 'P2002':
        message = 'A record with this information already exists';
        break;
      case 'P2025':
        message = 'Record not found';
        statusCode = 404;
        break;
      case 'P2003':
        message = 'Invalid reference to related record';
        break;
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Multer errors (file upload)
  if (err.name === 'MulterError') {
    statusCode = 400;
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      default:
        message = 'File upload error';
    }
  }

  // CORS errors
  if (err.message && err.message.includes('CORS')) {
    statusCode = 403;
    message = 'Cross-origin request not allowed';
  }

  // For API endpoints, return JSON error
  if (req.originalUrl.startsWith('/api/') || req.originalUrl.startsWith('/admin/api/')) {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: err.code || 'INTERNAL_ERROR',
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
          stack: err.stack,
          details: err,
        }),
      },
    });
  }

  // For admin panel, render error page or redirect
  if (statusCode === 404) {
    return res.status(404).render('errors/404', {
      layout: 'layouts/error',
      title: 'Page Not Found',
      message: 'The page you are looking for could not be found.',
    });
  }

  if (statusCode === 403) {
    return res.status(403).render('errors/403', {
      layout: 'layouts/error',
      title: 'Access Denied',
      message: 'You do not have permission to access this resource.',
    });
  }

  if (statusCode >= 500) {
    return res.status(statusCode).render('errors/500', {
      layout: 'layouts/error',
      title: 'Server Error',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred. Please try again later.' 
        : message,
      ...(process.env.NODE_ENV === 'development' && {
        error: err,
        stack: err.stack,
      }),
    });
  }

  // For other client errors, redirect with flash message
  req.flash('error', message);
  return res.redirect('/admin/dashboard');
};

/**
 * 404 handler for unmatched routes
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  next(error);
};

/**
 * Async error wrapper to catch async errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};