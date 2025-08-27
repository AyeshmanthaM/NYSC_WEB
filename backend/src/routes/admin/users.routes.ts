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
 * User management routes with Swagger documentation
 */

/**
 * @swagger
 * /admin/api/users:
 *   get:
 *     summary: List all users
 *     description: Get a paginated list of users with optional filtering and sorting
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/searchParam'
 *       - $ref: '#/components/parameters/sortParam'
 *       - name: role
 *         in: query
 *         description: Filter by user role
 *         schema:
 *           type: string
 *           enum: [USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN]
 *       - name: status
 *         in: query
 *         description: Filter by account status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *       - name: verified
 *         in: query
 *         description: Filter by email verification status
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get(
  '/',
  createValidationMiddleware(validateUserFilter),
  asyncHandler(adminUsersController.listUsers.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user account with specified role and permissions
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  createValidationMiddleware(validateUserCreate),
  asyncHandler(adminUsersController.createUser.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get(
  '/:id',
  asyncHandler(adminUsersController.getUserById.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/{id}:
 *   post:
 *     summary: Update user
 *     description: Update user information including role and status
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               role:
 *                 type: string
 *                 enum: [USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post(
  '/:id',
  createValidationMiddleware(validateUserUpdate),
  asyncHandler(adminUsersController.updateUser.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/{id}/delete:
 *   post:
 *     summary: Delete user
 *     description: Permanently delete a user account
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post(
  '/:id/delete',
  asyncHandler(adminUsersController.deleteUser.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/bulk:
 *   post:
 *     summary: Bulk user actions
 *     description: Perform bulk actions on multiple users (activate, deactivate, delete, change role)
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - userIds
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [activate, deactivate, delete, changeRole]
 *                 example: activate
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3, 4, 5]
 *               role:
 *                 type: string
 *                 enum: [USER, EDITOR, MODERATOR, ADMIN]
 *                 description: Required when action is "changeRole"
 *                 example: EDITOR
 *     responses:
 *       200:
 *         description: Bulk action completed successfully
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
 *                     affected:
 *                       type: integer
 *                       example: 5
 *                     failed:
 *                       type: integer
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Bulk action completed successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post(
  '/bulk',
  createValidationMiddleware(validateBulkUserAction),
  asyncHandler(adminUsersController.bulkAction.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/{id}/password:
 *   post:
 *     summary: Change user password
 *     description: Change the password for a specific user (admin action)
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewSecurePassword123!
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: NewSecurePassword123!
 *     responses:
 *       200:
 *         description: Password changed successfully
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
 *                   example: Password changed successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post(
  '/:id/password',
  createValidationMiddleware(validatePasswordChange),
  asyncHandler(adminUsersController.changePassword.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/api/search:
 *   get:
 *     summary: Search users
 *     description: Search for users by name or email (AJAX endpoint)
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         description: Search query (name or email)
 *         schema:
 *           type: string
 *           minLength: 2
 *           example: john
 *       - name: limit
 *         in: query
 *         description: Maximum number of results
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       role:
 *                         type: string
 *                         example: USER
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get(
  '/api/search',
  asyncHandler(adminUsersController.searchUsers.bind(adminUsersController))
);

/**
 * @swagger
 * /admin/api/users/export:
 *   get:
 *     summary: Export users to CSV
 *     description: Export all users or filtered users to a CSV file
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: role
 *         in: query
 *         description: Filter by user role
 *         schema:
 *           type: string
 *           enum: [USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN]
 *       - name: status
 *         in: query
 *         description: Filter by account status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *       - name: verified
 *         in: query
 *         description: Filter by email verification status
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: CSV file generated successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             schema:
 *               type: string
 *               example: attachment; filename="users-export-2024-01-01.csv"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get(
  '/export',
  asyncHandler(adminUsersController.exportUsers.bind(adminUsersController))
);

export default router;