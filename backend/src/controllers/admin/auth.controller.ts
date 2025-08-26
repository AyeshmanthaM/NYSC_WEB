import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth.service';
import { ActivityService } from '@/services/activity.service';
import { SessionHelper } from '@/middleware/session.middleware';
import { logger } from '@/config/logger';
import { validationResult } from 'express-validator';

const authService = new AuthService();
const activityService = new ActivityService();

export class AdminAuthController {
  /**
   * Check authentication status
   */
  async checkAuthStatus(req: Request, res: Response): Promise<void> {
    try {
      if (req.session?.userId && req.session?.user) {
        res.json({
          success: true,
          data: {
            isAuthenticated: true,
            user: req.session.user,
          },
        });
      } else {
        res.json({
          success: true,
          data: {
            isAuthenticated: false,
          },
        });
      }
    } catch (error) {
      logger.error('Auth status check error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'AUTH_CHECK_FAILED',
          message: 'Failed to check authentication status',
        },
      });
    }
  }

  /**
   * Process admin login
   */
  async processLogin(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please provide valid email and password.',
            details: errors.array(),
          },
        });
        return;
      }

      const { email, password } = req.body;

      try {
        // Validate admin credentials
        const user = await authService.validateCredentials(email, password);

        // Check if user has admin privileges
        const adminRoles = ['EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
        if (!adminRoles.includes(user.role)) {
          res.status(403).json({
            success: false,
            error: {
              code: 'INSUFFICIENT_PRIVILEGES',
              message: 'You do not have permission to access the admin panel.',
            },
          });
          return;
        }

        // Create admin session
        const sessionUser: Parameters<typeof SessionHelper.createAdminSession>[1] = {
          id: user.id,
          email: user.email,
          role: user.role as string,
        };
        if (user.firstName) sessionUser.firstName = user.firstName;
        if (user.lastName) sessionUser.lastName = user.lastName;
        SessionHelper.createAdminSession(req, sessionUser);

        // Log admin login activity
        await activityService.logAdminAction(
          user.id,
          'LOGIN',
          'admin_auth',
          undefined,
          {
            email: user.email,
            role: user.role,
          },
          req.ip || 'unknown',
          req.get('User-Agent')
        );

        logger.info('Admin login successful', {
          userId: user.id,
          email: user.email,
          role: user.role,
          ip: req.ip,
        });

        // Return success response with user data
        res.json({
          success: true,
          data: {
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            },
            message: `Welcome back, ${user.firstName || 'Admin'}!`,
          },
        });
      } catch (authError) {
        logger.warn('Admin login failed', {
          email,
          error: authError instanceof Error ? authError.message : 'Unknown error',
          ip: req.ip,
        });

        // Log failed login attempt
        await activityService.logActivity({
          userId: 'unknown',
          action: 'ADMIN_LOGIN_FAILED',
          resource: 'admin_auth',
          metadata: {
            email,
            error: authError instanceof Error ? authError.message : 'Unknown error',
          },
          ipAddress: req.ip || 'unknown',
          userAgent: req.get('User-Agent') || 'unknown',
        });

        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password. Please try again.',
          },
        });
      }
    } catch (error) {
      logger.error('Admin login process error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'LOGIN_ERROR',
          message: 'An error occurred during login. Please try again.',
        },
      });
    }
  }

  /**
   * Process admin logout
   */
  async processLogout(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.session?.userId;

      if (userId) {
        // Log logout activity
        await activityService.logAdminAction(
          userId,
          'LOGOUT',
          'admin_auth',
          undefined,
          {},
          req.ip,
          req.get('User-Agent')
        );

        logger.info('Admin logout', {
          userId,
          ip: req.ip,
        });
      }

      // Destroy session
      await SessionHelper.destroySession(req);

      // Return success response
      res.json({
        success: true,
        data: {
          message: 'Logged out successfully.',
        },
      });
    } catch (error) {
      logger.error('Admin logout error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'LOGOUT_ERROR',
          message: 'Failed to log out. Please try again.',
        },
      });
    }
  }


  /**
   * Process forgot password request
   */
  async processForgotPassword(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please provide a valid email address.',
            details: errors.array(),
          },
        });
        return;
      }

      const { email } = req.body;

      // TODO: Implement password reset functionality
      // For now, just return a success message
      res.json({
        success: true,
        data: {
          message: 'If an account with that email exists, we have sent password reset instructions.',
        },
      });
    } catch (error) {
      logger.error('Forgot password process error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'FORGOT_PASSWORD_ERROR',
          message: 'An error occurred. Please try again.',
        },
      });
    }
  }

  /**
   * Get current session data
   */
  async getSessionData(req: Request, res: Response): Promise<void> {
    try {
      const isAuthenticated = !!req.session?.userId;
      const timeRemaining = SessionHelper.getTimeRemaining(req);
      const expiringSoon = SessionHelper.isSessionExpiringSoon(req);

      res.json({
        success: true,
        data: {
          authenticated: isAuthenticated,
          timeRemaining,
          expiringSoon,
          user: isAuthenticated ? {
            id: req.session?.userId,
            email: req.session?.userEmail,
            role: req.session?.userRole,
            firstName: (req.session as any)?.userFirstName,
            lastName: (req.session as any)?.userLastName,
          } : null,
        },
      });
    } catch (error) {
      logger.error('Auth status check error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Unable to check authentication status',
        },
      });
    }
  }

  /**
   * Extend session (AJAX endpoint)
   */
  async extendSession(req: Request, res: Response): Promise<void> {
    try {
      if (!req.session?.userId) {
        res.status(401).json({
          success: false,
          error: {
            code: 'AUTH_REQUIRED',
            message: 'No active session',
          },
        });
        return;
      }

      SessionHelper.updateActivity(req);
      const timeRemaining = SessionHelper.getTimeRemaining(req);

      res.json({
        success: true,
        data: {
          timeRemaining,
          message: 'Session extended successfully',
        },
      });
    } catch (error) {
      logger.error('Session extension error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Unable to extend session',
        },
      });
    }
  }
}

export default new AdminAuthController();