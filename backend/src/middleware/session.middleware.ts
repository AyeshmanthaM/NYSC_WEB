import session from 'express-session';
import { RequestHandler } from 'express';
import connectRedis from 'connect-redis';
import { getRedisClient } from '@/config/redis';
import { SESSION_CONFIG } from '@/config/auth';
import { logger } from '@/config/logger';

// Extend session data interface
declare module 'express-session' {
  interface SessionData {
    userId: string;
    userEmail: string;
    userRole: string;
    userFirstName?: string;
    userLastName?: string;
    isAdmin: boolean;
    loginTime: number;
    lastActivity: number;
    expiresAt: number;
  }
}

// Create Redis store
const RedisStore = connectRedis;

// Session configuration factory
export const createSessionConfig = (): session.SessionOptions => ({
  store: new RedisStore({
    client: getRedisClient(),
    prefix: 'sess:',
    ttl: SESSION_CONFIG.timeout / 1000, // Convert to seconds
  }),
  name: SESSION_CONFIG.name,
  secret: SESSION_CONFIG.secret,
  resave: false,
  saveUninitialized: false,
  rolling: true, // Reset expiration on activity
  cookie: {
    secure: SESSION_CONFIG.secure,
    httpOnly: SESSION_CONFIG.httpOnly,
    maxAge: SESSION_CONFIG.timeout,
    sameSite: SESSION_CONFIG.sameSite,
  },
});

// Session middleware factory
export const createSessionMiddleware: () => RequestHandler = () => session(createSessionConfig());

/**
 * Session Activity Tracker
 * Updates last activity time and extends session
 */
export const sessionActivityTracker = (req: any, res: any, next: any) => {
  if (req.session && req.session.userId) {
    const now = Date.now();
    req.session.lastActivity = now;
    
    // Extend session expiration
    req.session.expiresAt = now + SESSION_CONFIG.timeout;
  }
  
  next();
};

/**
 * Session Security Middleware
 * Validates session integrity and security
 */
export const sessionSecurity = (req: any, res: any, next: any) => {
  if (req.session && req.session.userId) {
    // Check if session has expired
    if (req.session.expiresAt && Date.now() > req.session.expiresAt) {
      req.session.destroy((err: any) => {
        if (err) {
          logger.error('Session destruction error', { error: err });
        }
      });
      
      if (req.path.startsWith('/admin')) {
        res.redirect('/admin/login?expired=1');
        return;
      }
      
      res.status(401).json({
        success: false,
        error: {
          code: 'SESSION_EXPIRED',
          message: 'Session has expired',
        },
      });
      return;
    }

    // Check for session timeout (30 minutes of inactivity)
    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes
    if (req.session.lastActivity && (Date.now() - req.session.lastActivity) > inactivityTimeout) {
      req.session.destroy((err: any) => {
        if (err) {
          logger.error('Session destruction error', { error: err });
        }
      });
      
      if (req.path.startsWith('/admin')) {
        res.redirect('/admin/login?timeout=1');
        return;
      }
      
      res.status(401).json({
        success: false,
        error: {
          code: 'SESSION_TIMEOUT',
          message: 'Session timed out due to inactivity',
        },
      });
      return;
    }
  }
  
  next();
};

/**
 * Admin Session Validator
 * Ensures session belongs to admin-level user
 */
export const adminSessionValidator = (req: any, res: any, next: any) => {
  if (req.session && req.session.userId) {
    const adminRoles = ['EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
    
    if (!adminRoles.includes(req.session.userRole)) {
      req.session.destroy((err: any) => {
        if (err) {
          logger.error('Session destruction error', { error: err });
        }
      });
      
      res.redirect('/admin/login?unauthorized=1');
      return;
    }
  }
  
  next();
};

/**
 * Session Helpers
 */
export class SessionHelper {
  /**
   * Create admin session
   */
  static createAdminSession(
    req: any,
    user: {
      id: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
    }
  ): void {
    if (!req.session || typeof req.session.save !== 'function') {
      throw new Error('Session store not available - Redis connection may be down');
    }
    
    const now = Date.now();
    
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;
    req.session.userFirstName = user.firstName;
    req.session.userLastName = user.lastName;
    req.session.isAdmin = ['EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
    req.session.loginTime = now;
    req.session.lastActivity = now;
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    req.session.expiresAt = now + SESSION_CONFIG.timeout;
  }

  /**
   * Destroy session safely
   */
  static destroySession(req: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (req.session) {
        req.session.destroy((err: any) => {
          if (err) {
            logger.error('Session destruction error', { error: err });
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Get session info
   */
  static getSessionInfo(req: any): {
    userId?: string;
    email?: string;
    role?: string;
    isAdmin?: boolean;
    loginTime?: number;
    lastActivity?: number;
    expiresAt?: number;
  } {
    if (!req.session) return {};
    
    return {
      userId: req.session.userId,
      email: req.session.userEmail,
      role: req.session.userRole,
      isAdmin: req.session.isAdmin,
      loginTime: req.session.loginTime,
      lastActivity: req.session.lastActivity,
      expiresAt: req.session.expiresAt,
    };
  }

  /**
   * Check if session is admin
   */
  static isAdminSession(req: any): boolean {
    return req.session?.isAdmin === true;
  }

  /**
   * Check if user has role
   */
  static hasRole(req: any, role: string): boolean {
    return req.session?.userRole === role;
  }

  /**
   * Check if user has any of the roles
   */
  static hasAnyRole(req: any, roles: string[]): boolean {
    return roles.includes(req.session?.userRole);
  }

  /**
   * Update session activity
   */
  static updateActivity(req: any): void {
    if (req.session && req.session.userId) {
      const now = Date.now();
      req.session.lastActivity = now;
      req.session.expiresAt = now + SESSION_CONFIG.timeout;
    }
  }

  /**
   * Get session time remaining (in milliseconds)
   */
  static getTimeRemaining(req: any): number {
    if (!req.session?.expiresAt) return 0;
    return Math.max(0, req.session.expiresAt - Date.now());
  }

  /**
   * Is session about to expire (within 5 minutes)?
   */
  static isSessionExpiringSoon(req: any): boolean {
    const remaining = SessionHelper.getTimeRemaining(req);
    return remaining > 0 && remaining < 5 * 60 * 1000; // 5 minutes
  }
}

const sessionModule: {
  createSessionMiddleware: () => RequestHandler;
  sessionActivityTracker: any;
  sessionSecurity: any;
  adminSessionValidator: any;
  SessionHelper: typeof SessionHelper;
} = {
  createSessionMiddleware,
  sessionActivityTracker,
  sessionSecurity,
  adminSessionValidator,
  SessionHelper,
};

export default sessionModule;