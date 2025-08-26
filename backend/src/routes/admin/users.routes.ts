import { Router } from 'express';
import adminUsersController from '@/controllers/admin/users.controller';
import { asyncHandler } from '@/middleware/error.middleware';
import {
  createValidationMiddleware,
  validateUserCreate,
  validateUserUpdate,
  validatePasswordChange,
  validateUserFilter,
  validateBulkUserAction,
} from '@/middleware/validation.middleware';

const router: Router = Router();

/**
 * User management routes
 */

// List users with filtering and pagination (API endpoint)
router.get(
  '/',
  createValidationMiddleware(validateUserFilter),
  asyncHandler(adminUsersController.listUsers.bind(adminUsersController))
);

// Create user (API endpoint)
router.post(
  '/',
  createValidationMiddleware(validateUserCreate),
  asyncHandler(adminUsersController.createUser.bind(adminUsersController))
);

// Get user details (API endpoint)
router.get(
  '/:id',
  asyncHandler(adminUsersController.getUserById.bind(adminUsersController))
);

// Process user update
router.post(
  '/:id',
  createValidationMiddleware(validateUserUpdate),
  asyncHandler(adminUsersController.updateUser.bind(adminUsersController))
);

// Delete user
router.post(
  '/:id/delete',
  asyncHandler(adminUsersController.deleteUser.bind(adminUsersController))
);

// Bulk user actions
router.post(
  '/bulk',
  createValidationMiddleware(validateBulkUserAction),
  asyncHandler(adminUsersController.bulkAction.bind(adminUsersController))
);

// Change user password
router.post(
  '/:id/password',
  createValidationMiddleware(validatePasswordChange),
  asyncHandler(adminUsersController.changePassword.bind(adminUsersController))
);

// Search users (AJAX)
router.get(
  '/api/search',
  asyncHandler(adminUsersController.searchUsers.bind(adminUsersController))
);

// Export users CSV
router.get(
  '/export',
  asyncHandler(adminUsersController.exportUsers.bind(adminUsersController))
);

export default router;