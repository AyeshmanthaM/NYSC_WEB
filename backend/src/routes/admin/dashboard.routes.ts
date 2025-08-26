import { Router, Request, Response } from 'express';
import { asyncHandler } from '@/middleware/error.middleware';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();

/**
 * Dashboard API routes for Vue SPA
 */

// Get dashboard statistics
router.get('/stats', asyncHandler(async (req: Request, res: Response) => {
  const [
    totalUsers,
    totalNews,
    totalEvents,
    totalPrograms,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.newsArticle.count(),
    prisma.event.count(),
    prisma.program.count(),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalNews,
      totalEvents,
      totalPrograms,
      recentActivity: [],
    },
  });
}));

export default router;