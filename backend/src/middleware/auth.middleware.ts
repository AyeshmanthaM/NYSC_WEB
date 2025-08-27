import { Request, Response, NextFunction } from 'express';
import { JWTService } from '@/config/auth';
import { AuthService } from '@/services/auth.service';
import { logger } from '@/config/logger';
import jwt from 'jsonwebtoken';

// Request type extensions are defined in src/types/express.d.ts

const authService = new AuthService();

/**
 * JWT Authentication Middleware for API routes
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies?.accessToken || 
                 req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Access token required',
        },
      });
      return;
    }

    try {
      // Verify JWT token
      const payload = JWTService.verifyAccessToken(token);
      
      // Get user from database
      const user = await authService.getUserById(payload.userId);
      
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: {
            code: 'AUTH_INVALID',
            message: 'Invalid or inactive user',
          },
        });
        return;
      }

      // Attach user to request
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
      };

      next();
    } catch (jwtError) {
      if (jwtError instanceof Error) {
        if (jwtError.message === 'Access token expired') {
          res.status(401).json({
            success: false,
            error: {
              code: 'AUTH_EXPIRED',
              message: 'Access token expired',
            },
          });
          return;
        }
      }

      res.status(403).json({
        success: false,
        error: {
          code: 'AUTH_INVALID',
          message: 'Invalid access token',
        },
      });
      return;
    }
  } catch (error) {
    logger.error('Authentication middleware error', { error });
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Authentication error',
      },
    });
  }
};

/**
 * Optional JWT Authentication (user may or may not be authenticated)
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken || 
                 req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      next();
      return;
    }

    try {
      const payload = JWTService.verifyAccessToken(token);
      const user = await authService.getUserById(payload.userId);
      
      if (user && user.isActive) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
        };
      }
    } catch (jwtError) {
      // Ignore JWT errors for optional auth
      logger.debug('Optional auth failed', { error: jwtError });
    }

    next();
  } catch (error) {
    logger.error('Optional auth middleware error', { error });
    next();
  }
};

/**
 * Session Authentication Middleware for Admin routes
 */
export const authenticateSession = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check if session exists and has userId
  if (!req.session || !req.session.userId) {
    const returnUrl = encodeURIComponent(req.originalUrl);
    res.redirect(`/admin/login?redirect=${returnUrl}`);
    return;
  }

  // Check if session has expired
  if ((req.session as any).expiresAt && new Date() > new Date((req.session as any).expiresAt)) {
    req.session.destroy((err) => {
      if (err) {
        logger.error('Session destruction error', { error: err });
      }
    });
    res.redirect('/admin/login?expired=1');
    return;
  }

  // Attach user info to request from session
  req.user = {
    id: req.session.userId,
    email: req.session.userEmail || '',
    role: req.session.userRole || 'USER',
    firstName: (req.session as any).userFirstName,
    lastName: (req.session as any).userLastName,
  };

  next();
};

/**
 * Role-based Authorization Middleware
 */
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required',
        },
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'AUTH_FORBIDDEN',
          message: 'Insufficient permissions',
        },
      });
      return;
    }

    next();
  };
};

/**
 * Admin Role Authorization for session-based routes
 */
export const requireAdminRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.redirect('/admin/login');
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).render('errors/403', {
        layout: 'layouts/error',
        title: 'Access Denied',
        message: 'You do not have permission to access this page.',
      });
      return;
    }

    next();
  };
};

/**
 * Admin Authentication Helper (checks for admin-level roles)
 */
export const requireAdmin = requireRole('ADMIN', 'SUPER_ADMIN');
export const requireModerator = requireRole('MODERATOR', 'ADMIN', 'SUPER_ADMIN');
export const requireEditor = requireRole('EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN');

/**
 * Session-based Admin Role Helpers
 */
export const requireAdminSession = requireAdminRole('ADMIN', 'SUPER_ADMIN');
export const requireModeratorSession = requireAdminRole('MODERATOR', 'ADMIN', 'SUPER_ADMIN');
export const requireEditorSession = requireAdminRole('EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN');

/**
 * JWT Authentication Middleware for API routes (alternative to authenticateToken)
 */
export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Access token required'
        }
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Get user from database to ensure they still exist and are active
      const user = await authService.getUserById(decoded.userId);
      
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid or inactive user'
          }
        });
        return;
      }

      // Attach user info to request
      req.user = {
        id: user.id.toString(),
        email: user.email,
        role: user.role,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
      };

      next();
    } catch (error) {
      logger.error('JWT verification failed', { error });
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid or expired token'
        }
      });
    }
  } catch (error) {
    logger.error('Authentication middleware error', { error });
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Authentication error'
      }
    });
  }
};

/**
 * Check if user owns resource (for user-specific operations)
 */
export const requireOwnership = (userIdParam = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required',
        },
      });
      return;
    }

    const resourceUserId = req.params[userIdParam] || req.body[userIdParam];
    
    // Admin and Super Admin can access any resource
    if (['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      next();
      return;
    }

    // User must own the resource
    if (req.user.id !== resourceUserId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'AUTH_FORBIDDEN',
          message: 'You can only access your own resources',
        },
      });
      return;
    }

    next();
  };
};

/**
 * Rate Limiting Middleware for sensitive endpoints
 */
export const rateLimitAuth = (req: Request, res: Response, next: NextFunction): void => {
  // This is a placeholder - actual rate limiting is handled in the auth service
  // You could implement additional rate limiting here if needed
  next();
};

/**
 * Alias for requireRole for compatibility
 */
export const authorizeRoles = requireRole;

export default {
  authenticateToken,
  optionalAuth,
  authenticateSession,
  requireRole,
  requireAdminRole,
  requireAdmin,
  requireModerator,
  requireEditor,
  requireAdminSession,
  requireModeratorSession,
  requireEditorSession,
  requireOwnership,
  rateLimitAuth,
};