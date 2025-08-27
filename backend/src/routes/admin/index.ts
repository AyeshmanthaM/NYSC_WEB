import { Router } from 'express';

// Import route modules
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import userRoutes from './users.routes';
import directorsRoutes from './directors.routes';

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

/**
 * @swagger
 * /admin/api/login:
 *   post:
 *     summary: Admin login (direct)
 *     description: Direct admin login endpoint (alternative to /admin/api/auth/login)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
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
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/login', loginValidation, adminAuthController.processLogin);

/**
 * @swagger
 * /admin/api/logout:
 *   post:
 *     summary: Admin logout (direct)
 *     description: Direct admin logout endpoint (alternative to /admin/api/auth/logout)
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */
router.post('/logout', adminAuthController.processLogout);

/**
 * @swagger
 * /admin/api/check-auth:
 *   get:
 *     summary: Check authentication status
 *     description: Check if the user is authenticated and get basic user info
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: false
 */
router.get('/check-auth', adminAuthController.checkAuthStatus);

// All other admin routes require authentication
router.use(authenticateSession);

// Dashboard routes (all authenticated users can access)
router.use('/', dashboardRoutes);

// User management routes (require ADMIN or SUPER_ADMIN role)
router.use('/users', requireAdminSession, userRoutes);

// Directors management routes (require EDITOR or higher role)
router.use('/directors', directorsRoutes);

export default router;