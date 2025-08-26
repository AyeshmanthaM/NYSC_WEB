import { User, Role } from '@prisma/client';
import { prisma } from '@/config/database';
import { JWTService, PasswordService } from '@/config/auth';
import { logger } from '@/config/logger';
import { RedisCache, getRedisClient, createKey } from '@/config/redis';
import { ActivityService } from './activity.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: Omit<User, 'password'>;
  tokens: AuthTokens;
}

export class AuthService {
  private cache: RedisCache | null = null;
  private activityService: ActivityService;

  constructor() {
    this.activityService = new ActivityService();
  }

  private getCache(): RedisCache {
    if (!this.cache) {
      this.cache = new RedisCache(getRedisClient());
    }
    return this.cache;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData, ipAddress?: string): Promise<AuthResult> {
    try {
      // Validate email uniqueness
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Validate password strength
      const passwordValidation = PasswordService.validatePasswordStrength(data.password);
      if (!passwordValidation.valid) {
        throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
      }

      // Hash password
      const hashedPassword = await PasswordService.hashPassword(data.password);

      // Create user with profile
      const user = await prisma.user.create({
        data: {
          email: data.email.toLowerCase(),
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role || Role.USER,
          profile: {
            create: {},
          },
        },
        include: {
          profile: true,
        },
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Generate tokens
      const tokens = JWTService.generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Store refresh token
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      // Log activity
      await this.activityService.logActivity({
        userId: user.id,
        action: 'USER_REGISTERED',
        resource: 'auth',
        ipAddress: ipAddress || 'unknown',
      });

      logger.info('User registered successfully', {
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        user: userWithoutPassword,
        tokens,
      };
    } catch (error) {
      logger.error('Registration failed', { error, email: data.email });
      throw error;
    }
  }

  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials, ipAddress?: string): Promise<AuthResult> {
    try {
      const { email, password } = credentials;

      // Check rate limiting
      await this.checkRateLimit(email, ipAddress);

      // Find user with profile
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          profile: true,
        },
      });

      if (!user) {
        await this.recordFailedLogin(email, ipAddress);
        throw new Error('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        await this.recordFailedLogin(email, ipAddress);
        throw new Error('Account is disabled');
      }

      // Verify password
      const isPasswordValid = await PasswordService.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        await this.recordFailedLogin(email, ipAddress);
        throw new Error('Invalid credentials');
      }

      // Clear failed login attempts
      await this.clearFailedLogins(email, ipAddress);

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      // Generate tokens
      const tokens = JWTService.generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Store refresh token
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      // Log activity
      await this.activityService.logActivity({
        userId: user.id,
        action: 'USER_LOGIN',
        resource: 'auth',
        ipAddress: ipAddress || 'unknown',
      });

      logger.info('User logged in successfully', {
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        user: userWithoutPassword,
        tokens,
      };
    } catch (error) {
      logger.error('Login failed', { error, email: credentials.email });
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verify refresh token
      const payload = JWTService.verifyRefreshToken(refreshToken);

      // Check if refresh token exists in database
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Invalid or expired refresh token');
      }

      // Check if user is still active
      if (!storedToken.user.isActive) {
        throw new Error('User account is disabled');
      }

      // Generate new tokens
      const tokens = JWTService.generateTokenPair({
        userId: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role,
      });

      // Replace old refresh token with new one
      await prisma.refreshToken.update({
        where: { token: refreshToken },
        data: {
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      logger.info('Token refreshed successfully', { userId: storedToken.user.id });

      return tokens;
    } catch (error) {
      logger.error('Token refresh failed', { error });
      throw error;
    }
  }

  /**
   * Logout user by invalidating refresh token
   */
  async logout(refreshToken: string, userId?: string): Promise<void> {
    try {
      // Delete refresh token
      await prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
          ...(userId && { userId }),
        },
      });

      // Log activity
      if (userId) {
        await this.activityService.logActivity({
          userId,
          action: 'USER_LOGOUT',
          resource: 'auth',
        });
      }

      logger.info('User logged out successfully', { userId });
    } catch (error) {
      logger.error('Logout failed', { error, userId });
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<Omit<User, 'password'> | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
        },
      });

      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Get user by ID failed', { error, userId });
      return null;
    }
  }

  /**
   * Validate user credentials (for admin login)
   */
  async validateCredentials(email: string, password: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          profile: true,
        },
      });

      if (!user || !user.isActive) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await PasswordService.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Credential validation failed', { error, email });
      throw error;
    }
  }

  /**
   * Store refresh token in database
   */
  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    try {
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
    } catch (error) {
      logger.error('Failed to store refresh token', { error, userId });
      throw error;
    }
  }

  /**
   * Check rate limiting for login attempts
   */
  private async checkRateLimit(email: string, ipAddress?: string): Promise<void> {
    const emailKey = createKey('rate_limit', 'email', email);
    const ipKey = ipAddress ? createKey('rate_limit', 'ip', ipAddress) : null;

    const emailAttempts = await this.getCache().get<number>(emailKey) || 0;
    const ipAttempts = ipKey ? (await this.getCache().get<number>(ipKey) || 0) : 0;

    if (emailAttempts >= 5) {
      throw new Error('Too many login attempts for this email. Please try again later.');
    }

    if (ipAttempts >= 10) {
      throw new Error('Too many login attempts from this IP. Please try again later.');
    }
  }

  /**
   * Record failed login attempt
   */
  private async recordFailedLogin(email: string, ipAddress?: string): Promise<void> {
    const emailKey = createKey('rate_limit', 'email', email);
    const ipKey = ipAddress ? createKey('rate_limit', 'ip', ipAddress) : null;

    // Increment attempts with 15-minute expiry
    await this.getCache().increment(emailKey, 15 * 60);
    if (ipKey) {
      await this.getCache().increment(ipKey, 15 * 60);
    }
  }

  /**
   * Clear failed login attempts after successful login
   */
  private async clearFailedLogins(email: string, ipAddress?: string): Promise<void> {
    const emailKey = createKey('rate_limit', 'email', email);
    const ipKey = ipAddress ? createKey('rate_limit', 'ip', ipAddress) : null;

    await this.getCache().del(emailKey);
    if (ipKey) {
      await this.getCache().del(ipKey);
    }
  }

  /**
   * Clean up expired refresh tokens
   */
  async cleanupExpiredTokens(): Promise<number> {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      logger.info('Cleaned up expired refresh tokens', { count: result.count });
      return result.count;
    } catch (error) {
      logger.error('Failed to clean up expired tokens', { error });
      return 0;
    }
  }
}

export default new AuthService();