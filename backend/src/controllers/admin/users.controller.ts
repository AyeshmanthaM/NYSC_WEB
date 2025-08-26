import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UserService } from '@/services/user.service';
import { ActivityService } from '@/services/activity.service';
import { Role } from '@prisma/client';
import { logger } from '@/config/logger';

const userService = new UserService();
const activityService = new ActivityService();

export class AdminUsersController {
  /**
   * List users API endpoint
   */
  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string;
      const role = req.query.role as Role;
      const isActive = req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined;
      const sortBy = req.query.sortBy as string || 'createdAt';
      const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

      const result = await userService.getUsers({
        page,
        limit,
        search,
        role,
        isActive,
        sortBy,
        sortOrder,
      });

      res.json({
        success: true,
        data: {
          users: result.users,
          pagination: {
            page: result.page,
            totalPages: result.totalPages,
            total: result.total,
            hasNext: result.page < result.totalPages,
            hasPrev: result.page > 1,
          },
        },
      });
    } catch (error) {
      logger.error('List users API error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'LIST_USERS_ERROR',
          message: 'Unable to load users',
        },
      });
    }
  }

  /**
   * Get user by ID API endpoint
   */
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const userData = await userService.getUserById(id);
      if (!userData) {
        res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
        return;
      }

      res.json({
        success: true,
        data: userData,
      });
    } catch (error) {
      logger.error('Get user by ID error', { error });
      res.status(500).json({
        success: false,
        error: {
          code: 'GET_USER_ERROR',
          message: 'Unable to fetch user',
        },
      });
    }
  }

  /**
   * Show create user page
   */
  async showCreateUser(req: Request, res: Response): Promise<void> {
    try {
      res.render('admin/users/create', {
        layout: 'layouts/admin',
        title: 'Create User',
        currentPath: req.path,
        breadcrumb: [
          { label: 'User Management', url: '/admin/users' },
          { label: 'Create User' }
        ],
        roles: Object.values(Role),
        user: req.user,
        csrfToken: req.csrfToken ? req.csrfToken() : '',
      });
    } catch (error) {
      logger.error('Show create user page error', { error });
      req.flash('error', 'Unable to load create user page');
      res.redirect('/admin/users');
    }
  }

  /**
   * Process create user
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        
        res.render('admin/users/create', {
          layout: 'layouts/admin',
          title: 'Create User',
          currentPath: req.path,
          breadcrumb: [
            { label: 'User Management', url: '/admin/users' },
            { label: 'Create User' }
          ],
          roles: Object.values(Role),
          user: req.user,
          formData: req.body,
          errors: errorMessages,
          csrfToken: req.csrfToken ? req.csrfToken() : '',
        });
        return;
      }

      const { email, password, firstName, lastName, role } = req.body;

      // Create user
      const newUser = await userService.createUser({
        email,
        password,
        firstName,
        lastName,
        role: role || Role.USER,
      });

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'CREATE_USER',
        'user',
        newUser.id,
        {
          email: newUser.email,
          role: newUser.role,
        },
        req.ip,
        req.get('User-Agent')
      );

      req.flash('success', `User ${newUser.firstName} ${newUser.lastName} created successfully`);
      res.redirect('/admin/users');
    } catch (error) {
      logger.error('Create user error', { error, body: req.body });
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
      
      res.render('admin/users/create', {
        layout: 'layouts/admin',
        title: 'Create User',
        currentPath: req.path,
        breadcrumb: [
          { label: 'User Management', url: '/admin/users' },
          { label: 'Create User' }
        ],
        roles: Object.values(Role),
        user: req.user,
        formData: req.body,
        error: errorMessage,
        csrfToken: req.csrfToken ? req.csrfToken() : '',
      });
    }
  }

  /**
   * Show user details page
   */
  async showUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const userData = await userService.getUserById(id);
      if (!userData) {
        req.flash('error', 'User not found');
        res.redirect('/admin/users');
        return;
      }

      // Get user activities
      const activities = await activityService.getActivities({
        userId: id,
        limit: 20,
      });

      res.render('admin/users/show', {
        layout: 'layouts/admin',
        title: `${userData.firstName} ${userData.lastName}`,
        currentPath: req.path,
        breadcrumb: [
          { label: 'User Management', url: '/admin/users' },
          { label: `${userData.firstName} ${userData.lastName}` }
        ],
        userData,
        activities: activities.activities,
        user: req.user,
        csrfToken: req.csrfToken ? req.csrfToken() : '',
      });
    } catch (error) {
      logger.error('Show user error', { error, id: req.params.id });
      req.flash('error', 'Unable to load user details');
      res.redirect('/admin/users');
    }
  }

  /**
   * Show edit user page
   */
  async showEditUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const userData = await userService.getUserById(id);
      if (!userData) {
        req.flash('error', 'User not found');
        res.redirect('/admin/users');
        return;
      }

      res.render('admin/users/edit', {
        layout: 'layouts/admin',
        title: `Edit ${userData.firstName} ${userData.lastName}`,
        currentPath: req.path,
        breadcrumb: [
          { label: 'User Management', url: '/admin/users' },
          { label: `${userData.firstName} ${userData.lastName}`, url: `/admin/users/${id}` },
          { label: 'Edit' }
        ],
        userData,
        roles: Object.values(Role),
        user: req.user,
        csrfToken: req.csrfToken ? req.csrfToken() : '',
      });
    } catch (error) {
      logger.error('Show edit user error', { error, id: req.params.id });
      req.flash('error', 'Unable to load edit user page');
      res.redirect('/admin/users');
    }
  }

  /**
   * Process edit user
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const userData = await userService.getUserById(id);
        const errorMessages = errors.array().map(err => err.msg);
        
        res.render('admin/users/edit', {
          layout: 'layouts/admin',
          title: `Edit ${userData?.firstName} ${userData?.lastName}`,
          currentPath: req.path,
          breadcrumb: [
            { label: 'User Management', url: '/admin/users' },
            { label: `${userData?.firstName} ${userData?.lastName}`, url: `/admin/users/${id}` },
            { label: 'Edit' }
          ],
          userData,
          roles: Object.values(Role),
          user: req.user,
          formData: req.body,
          errors: errorMessages,
          csrfToken: req.csrfToken ? req.csrfToken() : '',
        });
        return;
      }

      const { firstName, lastName, email, role, isActive } = req.body;

      // Update user
      const updatedUser = await userService.updateUser(id, {
        firstName,
        lastName,
        email,
        role,
        isActive: isActive === 'true',
      });

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'UPDATE_USER',
        'user',
        updatedUser.id,
        {
          updatedFields: { firstName, lastName, email, role, isActive },
        },
        req.ip,
        req.get('User-Agent')
      );

      req.flash('success', `User ${updatedUser.firstName} ${updatedUser.lastName} updated successfully`);
      res.redirect(`/admin/users/${id}`);
    } catch (error) {
      logger.error('Update user error', { error, id: req.params.id, body: req.body });
      
      const userData = await userService.getUserById(req.params.id);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      
      res.render('admin/users/edit', {
        layout: 'layouts/admin',
        title: `Edit ${userData?.firstName} ${userData?.lastName}`,
        currentPath: req.path,
        breadcrumb: [
          { label: 'User Management', url: '/admin/users' },
          { label: `${userData?.firstName} ${userData?.lastName}`, url: `/admin/users/${req.params.id}` },
          { label: 'Edit' }
        ],
        userData,
        roles: Object.values(Role),
        user: req.user,
        formData: req.body,
        error: errorMessage,
        csrfToken: req.csrfToken ? req.csrfToken() : '',
      });
    }
  }

  /**
   * Delete user
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Get user info before deletion
      const userData = await userService.getUserById(id);
      if (!userData) {
        req.flash('error', 'User not found');
        res.redirect('/admin/users');
        return;
      }

      // Prevent self-deletion
      if (id === req.user!.id) {
        req.flash('error', 'Cannot delete your own account');
        res.redirect('/admin/users');
        return;
      }

      // Delete user
      await userService.deleteUser(id);

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'DELETE_USER',
        'user',
        id,
        {
          deletedUser: {
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            role: userData.role,
          },
        },
        req.ip,
        req.get('User-Agent')
      );

      req.flash('success', `User ${userData.firstName} ${userData.lastName} deleted successfully`);
      res.redirect('/admin/users');
    } catch (error) {
      logger.error('Delete user error', { error, id: req.params.id });
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      req.flash('error', errorMessage);
      res.redirect('/admin/users');
    }
  }

  /**
   * Bulk actions on users
   */
  async bulkAction(req: Request, res: Response): Promise<void> {
    try {
      const { action, userIds } = req.body;

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        req.flash('error', 'No users selected');
        res.redirect('/admin/users');
        return;
      }

      // Prevent bulk action on current user
      if (userIds.includes(req.user!.id)) {
        req.flash('error', 'Cannot perform bulk action on your own account');
        res.redirect('/admin/users');
        return;
      }

      let result;
      let successMessage = '';

      switch (action) {
        case 'activate':
          result = await userService.bulkUpdateUsers(userIds, { isActive: true });
          successMessage = `${result.updated} users activated`;
          break;
        
        case 'deactivate':
          result = await userService.bulkUpdateUsers(userIds, { isActive: false });
          successMessage = `${result.updated} users deactivated`;
          break;
        
        case 'make_editor':
          result = await userService.bulkUpdateUsers(userIds, { role: Role.EDITOR });
          successMessage = `${result.updated} users assigned EDITOR role`;
          break;
        
        case 'make_user':
          result = await userService.bulkUpdateUsers(userIds, { role: Role.USER });
          successMessage = `${result.updated} users assigned USER role`;
          break;
        
        default:
          req.flash('error', 'Invalid bulk action');
          res.redirect('/admin/users');
          return;
      }

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'BULK_USER_ACTION',
        'user',
        undefined,
        {
          action,
          userIds,
          updated: result.updated,
        },
        req.ip,
        req.get('User-Agent')
      );

      req.flash('success', successMessage);
      res.redirect('/admin/users');
    } catch (error) {
      logger.error('Bulk action error', { error, body: req.body });
      req.flash('error', 'Bulk action failed');
      res.redirect('/admin/users');
    }
  }

  /**
   * Change user password
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        res.redirect(`/admin/users/${id}/edit`);
        return;
      }

      await userService.changePassword(id, password);

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'CHANGE_USER_PASSWORD',
        'user',
        id,
        {},
        req.ip,
        req.get('User-Agent')
      );

      req.flash('success', 'Password changed successfully');
      res.redirect(`/admin/users/${id}`);
    } catch (error) {
      logger.error('Change password error', { error, id: req.params.id });
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
      req.flash('error', errorMessage);
      res.redirect(`/admin/users/${req.params.id}/edit`);
    }
  }

  /**
   * Search users (AJAX)
   */
  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        res.json({ success: true, data: [] });
        return;
      }

      const users = await userService.searchUsers(q, 10);

      res.json({
        success: true,
        data: users.map(user => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        })),
      });
    } catch (error) {
      logger.error('Search users error', { error, query: req.query.q });
      res.status(500).json({
        success: false,
        error: {
          code: 'SEARCH_FAILED',
          message: 'User search failed',
        },
      });
    }
  }

  /**
   * Export users (CSV)
   */
  async exportUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers({ limit: 1000 });
      
      const csvHeader = 'ID,Email,First Name,Last Name,Role,Active,Created At,Last Login\n';
      const csvData = users.users.map(user => [
        user.id,
        user.email,
        user.firstName || '',
        user.lastName || '',
        user.role,
        user.isActive,
        user.createdAt.toISOString(),
        user.lastLogin?.toISOString() || '',
      ].join(',')).join('\n');

      const csv = csvHeader + csvData;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="users-export.csv"');
      res.send(csv);

      // Log activity
      await activityService.logAdminAction(
        req.user!.id,
        'EXPORT_USERS',
        'user',
        undefined,
        { count: users.users.length },
        req.ip,
        req.get('User-Agent')
      );
    } catch (error) {
      logger.error('Export users error', { error });
      req.flash('error', 'Failed to export users');
      res.redirect('/admin/users');
    }
  }
}

export default new AdminUsersController();