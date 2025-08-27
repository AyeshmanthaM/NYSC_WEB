import { Router, Request, Response } from 'express';
import { asyncHandler } from '@/middleware/error.middleware';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();

/**
 * Dashboard API routes for Vue SPA
 */

/**
 * @swagger
 * /admin/api/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Retrieve dashboard statistics including counts of users, news, events, and programs
 *     tags: [Dashboard]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardStats'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
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