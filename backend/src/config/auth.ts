import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { logger } from './logger';

// JWT Configuration
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  issuer: 'nysc-backend',
  audience: 'nysc-frontend',
};

// Session Configuration
export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET || 'fallback-session-secret',
  name: process.env.SESSION_NAME || 'nysc.admin.sid',
  timeout: parseInt(process.env.SESSION_TIMEOUT || '86400000'), // 24 hours
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict' as const,
};

// Password Configuration
export const PASSWORD_CONFIG = {
  saltRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

// Rate Limiting Configuration
export const RATE_LIMIT_CONFIG = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  maxAttempts: parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '5'),
  lockoutDuration: parseInt(process.env.LOCKOUT_DURATION_MS || '900000'), // 15 minutes
};

// JWT Token Interface
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

// JWT Utilities
export class JWTService {
  // Generate access token
  static generateAccessToken(payload: Omit<JWTPayload, 'type'>): string {
    try {
      const options: jwt.SignOptions = {
        expiresIn: JWT_CONFIG.expiresIn as any,
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      };
      return jwt.sign(
        { ...payload, type: 'access' },
        JWT_CONFIG.secret,
        options
      );
    } catch (error) {
      logger.error('Error generating access token', { error, userId: payload.userId });
      throw new Error('Failed to generate access token');
    }
  }

  // Generate refresh token
  static generateRefreshToken(payload: Omit<JWTPayload, 'type'>): string {
    try {
      const options: jwt.SignOptions = {
        expiresIn: JWT_CONFIG.refreshExpiresIn as any,
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      };
      return jwt.sign(
        { ...payload, type: 'refresh' },
        JWT_CONFIG.refreshSecret,
        options
      );
    } catch (error) {
      logger.error('Error generating refresh token', { error, userId: payload.userId });
      throw new Error('Failed to generate refresh token');
    }
  }

  // Verify access token
  static verifyAccessToken(token: string): JWTPayload {
    try {
      const payload = jwt.verify(token, JWT_CONFIG.secret, {
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      }) as JWTPayload;

      if (payload.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return payload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token expired');
      }
      throw error;
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token: string): JWTPayload {
    try {
      const payload = jwt.verify(token, JWT_CONFIG.refreshSecret, {
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      }) as JWTPayload;

      if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return payload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      throw error;
    }
  }

  // Generate token pair
  static generateTokenPair(payload: Omit<JWTPayload, 'type'>): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}

// Password Utilities
export class PasswordService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, PASSWORD_CONFIG.saltRounds);
    } catch (error) {
      logger.error('Error hashing password', { error });
      throw new Error('Failed to hash password');
    }
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error('Error verifying password', { error });
      return false;
    }
  }

  // Validate password strength
  static validatePasswordStrength(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < PASSWORD_CONFIG.minLength) {
      errors.push(`Password must be at least ${PASSWORD_CONFIG.minLength} characters long`);
    }

    if (PASSWORD_CONFIG.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (PASSWORD_CONFIG.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (PASSWORD_CONFIG.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (PASSWORD_CONFIG.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Generate random password
  static generateRandomPassword(length = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()';
    
    const allChars = lowercase + uppercase + numbers + specialChars;
    let password = '';

    // Ensure at least one character from each required category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill remaining length with random characters
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

// Cookie Configuration
export const COOKIE_CONFIG = {
  accessToken: {
    name: 'accessToken',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/',
  },
  refreshToken: {
    name: 'refreshToken',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth',
  },
};

// Validation helpers
export const isStrongPassword = (password: string): boolean => {
  return PasswordService.validatePasswordStrength(password).valid;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default {
  JWT_CONFIG,
  SESSION_CONFIG,
  PASSWORD_CONFIG,
  RATE_LIMIT_CONFIG,
  JWTService,
  PasswordService,
  COOKIE_CONFIG,
};