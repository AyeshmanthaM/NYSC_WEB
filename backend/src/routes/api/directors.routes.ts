import { Router } from 'express';
import * as publicController from '@/controllers/api/directors.public.controller';
import * as adminController from '@/controllers/api/directors.admin.controller';
import { authenticateJWT, authorizeRoles } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { 
  chairmanValidation,
  boardMemberValidation,
  directorValidation,
  deputyDirectorValidation,
  assistantDirectorValidation,
  provincialDirectorValidation,
  provincialAssistantValidation
} from '@/validators/directors.validators';

const router: Router = Router();

/**
 * Public Routes - Read Only
 * These routes are accessible without authentication
 */

/**
 * @swagger
 * /api/public/directors/chairman:
 *   get:
 *     summary: Get Chairman Information
 *     description: Retrieve comprehensive information about the NYSC Chairman/Director General
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Chairman information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Chairman'
 *       404:
 *         description: Chairman information not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/chairman', publicController.getChairman);

/**
 * @swagger
 * /api/public/directors/board-members:
 *   get:
 *     summary: Get Board Members Information
 *     description: Retrieve comprehensive information about NYSC Board Members with governance details
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Board members information retrieved successfully
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
 *                     boardMembers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BoardMember'
 *                     governance:
 *                       type: object
 *                       properties:
 *                         monthlyMeetings:
 *                           type: string
 *                         strategicPlanning:
 *                           type: string
 *                         publicEngagement:
 *                           type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/board-members', publicController.getBoardMembers);

/**
 * @swagger
 * /api/public/directors/directors:
 *   get:
 *     summary: Get Directors Information
 *     description: Retrieve comprehensive information about departmental directors with statistics
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Directors information retrieved successfully
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
 *                     directors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Director'
 *                     departmentStats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           department:
 *                             type: string
 *                           programs:
 *                             type: number
 *                           beneficiaries:
 *                             type: string
 *                     leadership:
 *                       type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/directors', publicController.getDirectors);

/**
 * @swagger
 * /api/public/directors/deputy-directors:
 *   get:
 *     summary: Get Deputy Directors Information
 *     description: Retrieve comprehensive information about deputy directors organized by departments
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Deputy directors information retrieved successfully
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
 *                     deputyDirectors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DeputyDirector'
 *                     departmentGroups:
 *                       type: array
 *                       items:
 *                         type: object
 *                     organizationStats:
 *                       type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/deputy-directors', publicController.getDeputyDirectors);

/**
 * @swagger
 * /api/public/directors/assistant-directors:
 *   get:
 *     summary: Get Assistant Directors Information
 *     description: Retrieve comprehensive information about assistant directors with operational framework
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Assistant directors information retrieved successfully
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
 *                     assistantDirectors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AssistantDirector'
 *                     departmentGroups:
 *                       type: object
 *                     operationalStats:
 *                       type: object
 *                     framework:
 *                       type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/assistant-directors', publicController.getAssistantDirectors);

/**
 * @swagger
 * /api/public/directors/provincial-directors:
 *   get:
 *     summary: Get Provincial Directors Information
 *     description: Retrieve comprehensive information about provincial directors with regional coverage
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Provincial directors information retrieved successfully
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
 *                     provincialDirectors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ProvincialDirector'
 *                     provinceStats:
 *                       type: object
 *                     framework:
 *                       type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/provincial-directors', publicController.getProvincialDirectors);

/**
 * @swagger
 * /api/public/directors/provincial-assistants:
 *   get:
 *     summary: Get Provincial Assistant Directors Information
 *     description: Retrieve comprehensive information about provincial assistant directors with district coverage
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Provincial assistant directors information retrieved successfully
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
 *                     provincialAssistants:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ProvincialAssistant'
 *                     provinceGroups:
 *                       type: object
 *                     districtStats:
 *                       type: object
 *                     operationsFramework:
 *                       type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/provincial-assistants', publicController.getProvincialAssistants);

/**
 * @swagger
 * /api/public/directors/overview:
 *   get:
 *     summary: Get Directors Overview
 *     description: Retrieve comprehensive overview of all directors and leadership positions
 *     tags: [Public Directors]
 *     responses:
 *       200:
 *         description: Directors overview retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DirectorsOverview'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/public/directors/overview', publicController.getDirectorsOverview);

/**
 * Admin Routes - CRUD Operations
 * These routes require authentication and appropriate roles
 */

/**
 * Admin Routes - CRUD Operations
 * These routes require authentication and appropriate roles
 */

// Apply authentication middleware to all admin routes
router.use('/admin/directors', authenticateJWT);

/**
 * @swagger
 * /api/admin/directors/chairman:
 *   get:
 *     summary: Get Chairman Information (Admin)
 *     description: Retrieve chairman information for admin panel with full details
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chairman information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Chairman'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Chairman information not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/admin/directors/chairman',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getChairman
);

/**
 * @swagger
 * /api/admin/directors/chairman:
 *   put:
 *     summary: Update Chairman Information
 *     description: Update chairman information (requires ADMIN or SUPER_ADMIN role)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. Mahinda Rajapaksa"
 *               title:
 *                 type: string
 *                 example: "Chairman / Director General"
 *               description:
 *                 type: string
 *                 example: "Experienced leader with extensive background..."
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "chairman@nysc.lk"
 *               phone:
 *                 type: string
 *                 example: "+94112345678"
 *               linkedin:
 *                 type: string
 *                 example: "https://linkedin.com/in/chairman"
 *               tenure:
 *                 type: string
 *                 example: "2020 - Present"
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               vision:
 *                 type: string
 *                 example: "Empowering Sri Lankan youth..."
 *               keyInitiatives:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Chairman information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Chairman'
 *                 message:
 *                   type: string
 *                   example: "Chairman information updated successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/admin/directors/chairman',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(chairmanValidation),
  adminController.updateChairman
);

/**
 * @swagger
 * /api/admin/directors/board-members:
 *   get:
 *     summary: Get Board Members (Admin)
 *     description: Retrieve paginated list of board members with search and filtering options
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for name or position
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, all]
 *           default: all
 *         description: Filter by status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Board members retrieved successfully
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
 *                     $ref: '#/components/schemas/BoardMember'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationResponse'
 *   post:
 *     summary: Create Board Member
 *     description: Create a new board member (requires ADMIN or SUPER_ADMIN role)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. Jane Smith"
 *               position:
 *                 type: string
 *                 example: "Board Member - Finance Specialist"
 *               description:
 *                 type: string
 *                 example: "Experienced financial advisor..."
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.smith@nysc.lk"
 *               phone:
 *                 type: string
 *                 example: "+94112345679"
 *               linkedin:
 *                 type: string
 *                 example: "https://linkedin.com/in/janesmith"
 *               badge:
 *                 type: string
 *                 enum: [Chairman, Member, Secretary, Treasurer, Vice Chairman]
 *                 example: "Member"
 *     responses:
 *       201:
 *         description: Board member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BoardMember'
 *                 message:
 *                   type: string
 *                   example: "Board member created successfully"
 */
router.get('/admin/directors/board-members',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getBoardMembers
);

/**
 * @swagger
 * /api/admin/directors/board-members/{id}:
 *   get:
 *     summary: Get Board Member by ID
 *     description: Retrieve a specific board member by ID
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board member ID
 *     responses:
 *       200:
 *         description: Board member retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BoardMember'
 *       404:
 *         description: Board member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Update Board Member
 *     description: Update a board member's information
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardMember'
 *     responses:
 *       200:
 *         description: Board member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BoardMember'
 *                 message:
 *                   type: string
 *                   example: "Board member updated successfully"
 *   delete:
 *     summary: Delete Board Member
 *     description: Delete a board member (requires ADMIN or SUPER_ADMIN role)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board member ID
 *     responses:
 *       200:
 *         description: Board member deleted successfully
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
 *                   example: "Board member deleted successfully"
 */
router.get('/admin/directors/board-members/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getBoardMemberById
);

router.post('/admin/directors/board-members',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(boardMemberValidation),
  adminController.createBoardMember
);

router.put('/admin/directors/board-members/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(boardMemberValidation),
  adminController.updateBoardMember
);

router.delete('/admin/directors/board-members/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteBoardMember
);

// Directors Management
router.get('/admin/directors/directors',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getDirectors
);

router.get('/admin/directors/directors/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getDirectorById
);

router.post('/admin/directors/directors',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(directorValidation),
  adminController.createDirector
);

router.put('/admin/directors/directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(directorValidation),
  adminController.updateDirector
);

router.delete('/admin/directors/directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteDirector
);

// Deputy Directors Management
router.get('/admin/directors/deputy-directors',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getDeputyDirectors
);

router.get('/admin/directors/deputy-directors/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getDeputyDirectorById
);

router.post('/admin/directors/deputy-directors',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(deputyDirectorValidation),
  adminController.createDeputyDirector
);

router.put('/admin/directors/deputy-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(deputyDirectorValidation),
  adminController.updateDeputyDirector
);

router.delete('/admin/directors/deputy-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteDeputyDirector
);

// Assistant Directors Management
router.get('/admin/directors/assistant-directors',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getAssistantDirectors
);

router.get('/admin/directors/assistant-directors/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getAssistantDirectorById
);

router.post('/admin/directors/assistant-directors',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(assistantDirectorValidation),
  adminController.createAssistantDirector
);

router.put('/admin/directors/assistant-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(assistantDirectorValidation),
  adminController.updateAssistantDirector
);

router.delete('/admin/directors/assistant-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteAssistantDirector
);

// Provincial Directors Management
router.get('/admin/directors/provincial-directors',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getProvincialDirectors
);

router.get('/admin/directors/provincial-directors/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getProvincialDirectorById
);

router.post('/admin/directors/provincial-directors',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(provincialDirectorValidation),
  adminController.createProvincialDirector
);

router.put('/admin/directors/provincial-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(provincialDirectorValidation),
  adminController.updateProvincialDirector
);

router.delete('/admin/directors/provincial-directors/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteProvincialDirector
);

// Provincial Assistant Directors Management
router.get('/admin/directors/provincial-assistants',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getProvincialAssistants
);

router.get('/admin/directors/provincial-assistants/:id',
  authorizeRoles('ADMIN', 'MODERATOR', 'SUPER_ADMIN'),
  adminController.getProvincialAssistantById
);

router.post('/admin/directors/provincial-assistants',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(provincialAssistantValidation),
  adminController.createProvincialAssistant
);

router.put('/admin/directors/provincial-assistants/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  validateRequest(provincialAssistantValidation),
  adminController.updateProvincialAssistant
);

router.delete('/admin/directors/provincial-assistants/:id',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteProvincialAssistant
);

/**
 * @swagger
 * /api/admin/directors/{type}/{id}/image:
 *   post:
 *     summary: Upload Director Image
 *     description: Upload an image for a director (chairman, board-member, director, etc.)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [chairman, board-member, director, deputy-director, assistant-director, provincial-director, provincial-assistant]
 *         description: Type of director
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Director ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WebP, max 5MB)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                     imageUrl:
 *                       type: string
 *                       example: "/uploads/directors/chairman_1234567890.jpg"
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *       400:
 *         description: Invalid file or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Director not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete Director Image
 *     description: Delete the image for a director
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [chairman, board-member, director, deputy-director, assistant-director, provincial-director, provincial-assistant]
 *         description: Type of director
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Director ID
 *     responses:
 *       200:
 *         description: Image deleted successfully
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
 *                   example: "Image deleted successfully"
 *       404:
 *         description: Director or image not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/admin/directors/:type/:id/image',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.uploadDirectorImage
);

router.delete('/admin/directors/:type/:id/image',
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  adminController.deleteDirectorImage
);

export default router;