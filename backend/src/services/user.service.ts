import { User, Role, Prisma } from '@prisma/client';
import { prisma } from '@/config/database';
import { PasswordService } from '@/config/auth';
import { logger } from '@/config/logger';
import emailService from '@/services/email.service';

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  isActive?: boolean;
}

export interface UserFilter {
  search?: string;
  role?: Role;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserWithProfile extends Omit<User, 'password'> {
  profile: {
    id: string;
    userId: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    district: string | null;
    avatar: string | null;
    bio: string | null;
  } | null;
  _count: {
    activities: number;
  };
}

export class UserService {
  /**
   * Get users with pagination and filtering
   */
  async getUsers(filter: UserFilter = {}): Promise<{
    users: UserWithProfile[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const {
        search,
        role,
        isActive,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = filter;

      const skip = (page - 1) * limit;
      const where: Prisma.UserWhereInput = {};

      // Search filter
      if (search) {
        where.OR = [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
        ];
      }

      // Role filter
      if (role) {
        where.role = role;
      }

      // Active status filter
      if (typeof isActive === 'boolean') {
        where.isActive = isActive;
      }

      // Sorting
      const orderBy: Prisma.UserOrderByWithRelationInput = {};
      if (sortBy === 'name') {
        orderBy.firstName = sortOrder;
      } else if (sortBy === 'email') {
        orderBy.email = sortOrder;
      } else if (sortBy === 'role') {
        orderBy.role = sortOrder;
      } else if (sortBy === 'lastLogin') {
        orderBy.lastLogin = sortOrder;
      } else {
        orderBy.createdAt = sortOrder;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          include: {
            profile: true,
            _count: {
              select: { activities: true },
            },
          },
          orderBy,
          skip,
          take: limit,
        }),
        prisma.user.count({ where }),
      ]);

      // Remove password from response
      const usersWithoutPassword = users.map(({ password, ...user }) => user);

      return {
        users: usersWithoutPassword,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      logger.error('Get users failed', { error, filter });
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<UserWithProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
      });

      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Get user by ID failed', { error, id });
      throw error;
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<UserWithProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
      });

      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Get user by email failed', { error, email });
      throw error;
    }
  }

  /**
   * Create new user
   */
  async createUser(data: CreateUserData): Promise<UserWithProfile> {
    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (existingUser) {
        throw new Error('Email already exists');
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
          _count: {
            select: { activities: true },
          },
        },
      });

      logger.info('User created', {
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Send welcome email (fire and forget)
      emailService.sendWelcomeEmail({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email,
        loginUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/admin/login`,
        role: user.role,
      }).catch(emailError => {
        // Only log as warn if SMTP is enabled, otherwise as info
        const logLevel = process.env.SMTP_ENABLED === 'true' ? 'warn' : 'info';
        const message = process.env.SMTP_ENABLED === 'true' 
          ? 'Failed to send welcome email' 
          : 'Welcome email not sent (SMTP disabled)';
        
        logger[logLevel](message, { 
          error: emailError, 
          userId: user.id, 
          email: user.email,
          smtpEnabled: process.env.SMTP_ENABLED === 'true'
        });
      });

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Create user failed', { error, email: data.email });
      throw error;
    }
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserData): Promise<UserWithProfile> {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error('User not found');
      }

      // Check email uniqueness if email is being updated
      if (data.email && data.email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email: data.email.toLowerCase() },
        });

        if (emailExists) {
          throw new Error('Email already exists');
        }
      }

      // Update user
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...(data.firstName && { firstName: data.firstName }),
          ...(data.lastName && { lastName: data.lastName }),
          ...(data.email && { email: data.email.toLowerCase() }),
          ...(data.role && { role: data.role }),
          ...(typeof data.isActive === 'boolean' && { isActive: data.isActive }),
        },
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
      });

      logger.info('User updated', {
        userId: user.id,
        updatedFields: Object.keys(data),
      });

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Update user failed', { error, id, data });
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    profileData: {
      phone?: string;
      address?: string;
      city?: string;
      district?: string;
      bio?: string;
    }
  ): Promise<UserWithProfile> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          profile: {
            upsert: {
              create: profileData,
              update: profileData,
            },
          },
        },
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
      });

      logger.info('User profile updated', { userId, profileData });

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Update user profile failed', { error, userId, profileData });
      throw error;
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, newPassword: string): Promise<void> {
    try {
      // Validate password strength
      const passwordValidation = PasswordService.validatePasswordStrength(newPassword);
      if (!passwordValidation.valid) {
        throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
      }

      // Hash new password
      const hashedPassword = await PasswordService.hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Invalidate all refresh tokens
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });

      logger.info('User password changed', { userId });
    } catch (error) {
      logger.error('Change password failed', { error, userId });
      throw error;
    }
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: { email: true, role: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Prevent deletion of SUPER_ADMIN users
      if (user.role === Role.SUPER_ADMIN) {
        throw new Error('Cannot delete SUPER_ADMIN user');
      }

      await prisma.user.delete({
        where: { id },
      });

      logger.info('User deleted', { userId: id, email: user.email });
    } catch (error) {
      logger.error('Delete user failed', { error, id });
      throw error;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    byRole: { role: Role; count: number }[];
    recentRegistrations: number;
  }> {
    try {
      const [total, active, inactive, byRole, recentRegistrations] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isActive: true } }),
        prisma.user.count({ where: { isActive: false } }),
        prisma.user.groupBy({
          by: ['role'],
          _count: { role: true },
          orderBy: { _count: { role: 'desc' } },
        }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        }),
      ]);

      const roleStats = byRole.map(item => ({
        role: item.role,
        count: item._count.role,
      }));

      return {
        total,
        active,
        inactive,
        byRole: roleStats,
        recentRegistrations,
      };
    } catch (error) {
      logger.error('Get user stats failed', { error });
      throw error;
    }
  }

  /**
   * Get recent users
   */
  async getRecentUsers(limit = 5): Promise<UserWithProfile[]> {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      const usersWithoutPassword = users.map(({ password, ...user }) => user);
      return usersWithoutPassword as UserWithProfile[];
    } catch (error) {
      logger.error('Get recent users failed', { error });
      throw error;
    }
  }

  /**
   * Bulk update users
   */
  async bulkUpdateUsers(
    userIds: string[],
    data: { isActive?: boolean; role?: Role }
  ): Promise<{ updated: number }> {
    try {
      const result = await prisma.user.updateMany({
        where: {
          id: { in: userIds },
          // Prevent bulk update of SUPER_ADMIN users
          role: { not: Role.SUPER_ADMIN },
        },
        data,
      });

      logger.info('Bulk user update', {
        userIds,
        data,
        updated: result.count,
      });

      return { updated: result.count };
    } catch (error) {
      logger.error('Bulk update users failed', { error, userIds, data });
      throw error;
    }
  }

  /**
   * Search users
   */
  async searchUsers(query: string, limit = 10): Promise<UserWithProfile[]> {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: query } },
            { lastName: { contains: query } },
            { email: { contains: query } },
          ],
        },
        include: {
          profile: true,
          _count: {
            select: { activities: true },
          },
        },
        take: limit,
      });

      const usersWithoutPassword = users.map(({ password, ...user }) => user);
      return usersWithoutPassword;
    } catch (error) {
      logger.error('Search users failed', { error, query });
      throw error;
    }
  }
}

export default new UserService();