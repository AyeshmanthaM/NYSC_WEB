import { ActivityLog } from '@prisma/client';
import { prisma } from '@/config/database';
import { logger } from '@/config/logger';

export interface ActivityData {
  userId: string;
  action: string;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityFilter {
  userId?: string;
  action?: string;
  resource?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export class ActivityService {
  /**
   * Log user activity
   */
  async logActivity(data: ActivityData): Promise<ActivityLog> {
    try {
      const activity = await prisma.activityLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId,
          metadata: data.metadata || {},
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });

      logger.info('Activity logged', {
        userId: data.userId,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
      });

      return activity;
    } catch (error) {
      logger.error('Failed to log activity', { error, data });
      throw error;
    }
  }

  /**
   * Get user activities with pagination
   */
  async getActivities(filter: ActivityFilter = {}): Promise<{
    activities: (ActivityLog & { user: { firstName: string; lastName: string; email: string } })[];
    total: number;
  }> {
    try {
      const {
        userId,
        action,
        resource,
        startDate,
        endDate,
        limit = 20,
        offset = 0,
      } = filter;

      const where: any = {};

      if (userId) where.userId = userId;
      if (action) where.action = action;
      if (resource) where.resource = resource;
      
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = startDate;
        if (endDate) where.createdAt.lte = endDate;
      }

      const [activities, total] = await Promise.all([
        prisma.activityLog.findMany({
          where,
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        prisma.activityLog.count({ where }),
      ]);

      return { activities: activities as any, total };
    } catch (error) {
      logger.error('Failed to get activities', { error, filter });
      throw error;
    }
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(limit = 10): Promise<(ActivityLog & { 
    user: { firstName: string | null; lastName: string | null; email: string } 
  })[]> {
    try {
      return await prisma.activityLog.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    } catch (error) {
      logger.error('Failed to get recent activities', { error });
      throw error;
    }
  }

  /**
   * Get activity statistics
   */
  async getActivityStats(days = 30): Promise<{
    totalActivities: number;
    uniqueUsers: number;
    topActions: { action: string; count: number }[];
    dailyStats: { date: string; count: number }[];
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Get total activities and unique users
      const [totalActivities, uniqueUsersResult] = await Promise.all([
        prisma.activityLog.count({
          where: { createdAt: { gte: startDate } },
        }),
        prisma.activityLog.groupBy({
          by: ['userId'],
          where: { createdAt: { gte: startDate } },
          _count: { userId: true },
        }),
      ]);

      const uniqueUsers = uniqueUsersResult.length;

      // Get top actions
      const topActionsResult = await prisma.activityLog.groupBy({
        by: ['action'],
        where: { createdAt: { gte: startDate } },
        _count: { action: true },
        orderBy: { _count: { action: 'desc' } },
        take: 10,
      });

      const topActions = topActionsResult.map(item => ({
        action: item.action,
        count: item._count.action,
      }));

      // Get daily stats
      const activities = await prisma.activityLog.findMany({
        where: { createdAt: { gte: startDate } },
        select: { createdAt: true },
      });

      const dailyStatsMap = new Map<string, number>();
      
      // Initialize with zero counts for all days
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        dailyStatsMap.set(dateString, 0);
      }

      // Count activities by day
      activities.forEach(activity => {
        const dateString = activity.createdAt.toISOString().split('T')[0];
        const currentCount = dailyStatsMap.get(dateString) || 0;
        dailyStatsMap.set(dateString, currentCount + 1);
      });

      const dailyStats = Array.from(dailyStatsMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        totalActivities,
        uniqueUsers,
        topActions,
        dailyStats,
      };
    } catch (error) {
      logger.error('Failed to get activity stats', { error });
      throw error;
    }
  }

  /**
   * Clean up old activities (keep only last N days)
   */
  async cleanupOldActivities(daysToKeep = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const result = await prisma.activityLog.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
        },
      });

      logger.info('Cleaned up old activities', { 
        count: result.count,
        cutoffDate: cutoffDate.toISOString(),
      });

      return result.count;
    } catch (error) {
      logger.error('Failed to clean up old activities', { error });
      return 0;
    }
  }

  /**
   * Log admin panel actions
   */
  async logAdminAction(
    userId: string,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logActivity({
      userId,
      action: `ADMIN_${action}`,
      resource,
      resourceId,
      metadata,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Get user activity summary
   */
  async getUserActivitySummary(userId: string, days = 30): Promise<{
    totalActions: number;
    lastActivity: Date | null;
    topActions: { action: string; count: number }[];
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const activities = await prisma.activityLog.findMany({
        where: {
          userId,
          createdAt: { gte: startDate },
        },
        select: {
          action: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const totalActions = activities.length;
      const lastActivity = activities.length > 0 ? activities[0].createdAt : null;

      // Count actions
      const actionCounts = new Map<string, number>();
      activities.forEach(activity => {
        const count = actionCounts.get(activity.action) || 0;
        actionCounts.set(activity.action, count + 1);
      });

      const topActions = Array.from(actionCounts.entries())
        .map(([action, count]) => ({ action, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        totalActions,
        lastActivity,
        topActions,
      };
    } catch (error) {
      logger.error('Failed to get user activity summary', { error, userId });
      throw error;
    }
  }
}

export default new ActivityService();