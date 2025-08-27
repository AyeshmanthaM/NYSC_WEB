import { Router } from 'express';
import { apiRateLimit } from '@/middleware/security.middleware';

// Import API route modules
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import publicRoutes from './public.routes';
import directorsRoutes from './directors.routes';

const router: Router = Router();

// Apply API rate limiting to all API routes
router.use(apiRateLimit);

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get API information
 *     description: Returns basic information about the API including version, environment, and current timestamp
 *     tags: [Public API]
 *     responses:
 *       200:
 *         description: API information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: NYSC Sri Lanka Admin API
 *                     version:
 *                       type: string
 *                       example: 1.0.0
 *                     environment:
 *                       type: string
 *                       example: development
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'NYSC Sri Lanka Admin API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/public', publicRoutes);
router.use('/', directorsRoutes); // Directors routes include both /public and /admin paths

// API 404 handler
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'API_ENDPOINT_NOT_FOUND',
      message: 'API endpoint not found',
      path: req.originalUrl,
    },
  });
});

export default router;