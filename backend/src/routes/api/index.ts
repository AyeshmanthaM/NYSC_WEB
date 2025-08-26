import { Router } from 'express';
import { apiRateLimit } from '@/middleware/security.middleware';

// Import API route modules (for future use)
// import authRoutes from './auth.routes';
// import usersRoutes from './users.routes';
// import publicRoutes from './public.routes';

const router: Router = Router();

// Apply API rate limiting to all API routes
router.use(apiRateLimit);

// API info endpoint
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

// API routes (to be implemented)
// router.use('/auth', authRoutes);
// router.use('/users', usersRoutes);
// router.use('/public', publicRoutes);

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