import { Router } from 'express';

// Import route modules
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import userRoutes from './users.routes';

// Import controllers for direct routes
import adminAuthController from '@/controllers/admin/auth.controller';
import { body } from 'express-validator';

// Import middleware
import { authenticateSession, requireAdminSession } from '@/middleware/auth.middleware';

const router: Router = Router();

// Public auth API routes (no authentication required)
router.use('/auth', authRoutes);

// Auth API endpoints for Vue SPA
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', loginValidation, adminAuthController.processLogin);
router.post('/logout', adminAuthController.processLogout);
router.get('/check-auth', adminAuthController.checkAuthStatus);

// All other admin routes require authentication
router.use(authenticateSession);

// Dashboard routes (all authenticated users can access)
router.use('/', dashboardRoutes);

// User management routes (require ADMIN or SUPER_ADMIN role)
router.use('/users', requireAdminSession, userRoutes);

export default router;