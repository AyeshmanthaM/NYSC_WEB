import { Router } from 'express';
import { body } from 'express-validator';
import adminAuthController from '@/controllers/admin/auth.controller';
import { authenticateSession } from '@/middleware/auth.middleware';

const router: Router = Router();

// Validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
];

/**
 * @swagger
 * /admin/api/auth/login:
 *   post:
 *     summary: Admin user login
 *     description: Authenticate an admin user and create a session
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
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     message:
 *                       type: string
 *                       example: Login successful
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: INVALID_CREDENTIALS
 *                 message: Invalid email or password
 *       429:
 *         description: Too many login attempts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', loginValidation, adminAuthController.processLogin);
/**
 * @swagger
 * /admin/api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset email to the user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
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
 *                   example: Password reset instructions have been sent to your email
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: Email not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/forgot-password', forgotPasswordValidation, adminAuthController.processForgotPassword);

/**
 * @swagger
 * /admin/api/auth/logout:
 *   post:
 *     summary: Admin user logout
 *     description: Destroy the current user session
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
 * /admin/api/auth/status:
 *   get:
 *     summary: Get session status
 *     description: Check if the current session is valid and get user information
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Session is valid
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
 *                     authenticated:
 *                       type: boolean
 *                       example: true
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     sessionExpiry:
 *                       type: string
 *                       format: date-time
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/status', authenticateSession, adminAuthController.getSessionData);
/**
 * @swagger
 * /admin/api/auth/extend-session:
 *   post:
 *     summary: Extend session timeout
 *     description: Reset the session timeout to prevent automatic logout
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Session extended successfully
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
 *                     newExpiry:
 *                       type: string
 *                       format: date-time
 *                     message:
 *                       type: string
 *                       example: Session extended successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/extend-session', authenticateSession, adminAuthController.extendSession);

export default router;