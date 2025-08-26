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

// Auth API routes for Vue SPA
router.post('/login', loginValidation, adminAuthController.processLogin);
router.post('/forgot-password', forgotPasswordValidation, adminAuthController.processForgotPassword);

router.post('/logout', adminAuthController.processLogout);

// AJAX endpoints for session management
router.get('/status', authenticateSession, adminAuthController.getSessionData);
router.post('/extend-session', authenticateSession, adminAuthController.extendSession);

export default router;