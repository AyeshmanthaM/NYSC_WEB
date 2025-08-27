import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '@/middleware/validation.middleware';
import {
  // Chairman Management
  getChairman,
  updateChairman,
  
  // Board Members Management
  getBoardMembers,
  getBoardMemberById,
  createBoardMember,
  updateBoardMember,
  deleteBoardMember,
  
  // Directors Management
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  
  // Deputy Directors Management
  getDeputyDirectors,
  getDeputyDirectorById,
  createDeputyDirector,
  updateDeputyDirector,
  deleteDeputyDirector,
  
  // Assistant Directors Management
  getAssistantDirectors,
  getAssistantDirectorById,
  createAssistantDirector,
  updateAssistantDirector,
  deleteAssistantDirector,
  
  // Provincial Directors Management
  getProvincialDirectors,
  getProvincialDirectorById,
  createProvincialDirector,
  updateProvincialDirector,
  deleteProvincialDirector,
  
  // Provincial Assistants Management
  getProvincialAssistants,
  getProvincialAssistantById,
  createProvincialAssistant,
  updateProvincialAssistant,
  deleteProvincialAssistant,
  
  // Image Management
  uploadDirectorImage,
  deleteDirectorImage,
  
  // Overview
  getDirectorsOverview
} from '@/controllers/api/directors.admin.controller';

const router: Router = Router();

// Validation schemas
const chairmanValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('title').optional().trim().isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('tenure').optional().trim().isLength({ max: 100 }).withMessage('Tenure must not exceed 100 characters'),
  body('vision').optional().trim().isLength({ max: 2000 }).withMessage('Vision must not exceed 2000 characters'),
  body('qualifications').optional().isArray().withMessage('Qualifications must be an array'),
  body('achievements').optional().isArray().withMessage('Achievements must be an array'),
  body('keyInitiatives').optional().isArray().withMessage('Key Initiatives must be an array')
];

const boardMemberValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('badge').optional().trim().isLength({ max: 50 }).withMessage('Badge must not exceed 50 characters'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const directorValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('department').trim().isLength({ min: 2, max: 100 }).withMessage('Department must be between 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('specialization').optional().trim().isLength({ max: 200 }).withMessage('Specialization must not exceed 200 characters'),
  body('experience').optional().trim().isLength({ max: 500 }).withMessage('Experience must not exceed 500 characters'),
  body('achievements').optional().isArray().withMessage('Achievements must be an array'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const deputyDirectorValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('department').trim().isLength({ min: 2, max: 100 }).withMessage('Department must be between 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('specialization').optional().trim().isLength({ max: 200 }).withMessage('Specialization must not exceed 200 characters'),
  body('provinces').optional().isArray().withMessage('Provinces must be an array'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const assistantDirectorValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('department').trim().isLength({ min: 2, max: 100 }).withMessage('Department must be between 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('region').optional().trim().isLength({ max: 100 }).withMessage('Region must not exceed 100 characters'),
  body('specialization').optional().trim().isLength({ max: 200 }).withMessage('Specialization must not exceed 200 characters'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const provincialDirectorValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('province').trim().isLength({ min: 2, max: 100 }).withMessage('Province must be between 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('headquarters').optional().trim().isLength({ max: 200 }).withMessage('Headquarters must not exceed 200 characters'),
  body('districts').optional().isArray().withMessage('Districts must be an array'),
  body('population').optional().trim().isLength({ max: 50 }).withMessage('Population must not exceed 50 characters'),
  body('centers').optional().isInt({ min: 0 }).withMessage('Centers must be a positive integer'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('achievements').optional().isArray().withMessage('Achievements must be an array'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const provincialAssistantValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2-100 characters'),
  body('province').trim().isLength({ min: 2, max: 100 }).withMessage('Province must be between 2-100 characters'),
  body('district').trim().isLength({ min: 2, max: 100 }).withMessage('District must be between 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().matches(/^[0-9+\-\s()]+$/).withMessage('Please provide a valid phone number'),
  body('headquarters').optional().trim().isLength({ max: 200 }).withMessage('Headquarters must not exceed 200 characters'),
  body('population').optional().trim().isLength({ max: 50 }).withMessage('Population must not exceed 50 characters'),
  body('centers').optional().isInt({ min: 0 }).withMessage('Centers must be a positive integer'),
  body('specialization').optional().trim().isLength({ max: 200 }).withMessage('Specialization must not exceed 200 characters'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const idValidation = [
  param('id').isString().isLength({ min: 1 }).withMessage('ID is required')
];

/**
 * @swagger
 * /admin/api/directors/overview:
 *   get:
 *     summary: Get directors overview statistics
 *     description: Get comprehensive statistics about all director levels
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Overview statistics retrieved successfully
 */
router.get('/overview', getDirectorsOverview);

// =============================
// CHAIRMAN ROUTES
// =============================

/**
 * @swagger
 * /admin/api/directors/chairman:
 *   get:
 *     summary: Get chairman information
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Chairman information retrieved successfully
 *       404:
 *         description: Chairman information not found
 */
router.get('/chairman', getChairman);

/**
 * @swagger
 * /admin/api/directors/chairman:
 *   put:
 *     summary: Update chairman information
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chairman information updated successfully
 */
router.put('/chairman', chairmanValidation, validateRequest, updateChairman);

// =============================
// IMAGE MANAGEMENT ROUTES
// =============================

/**
 * @swagger
 * /admin/api/directors/{type}/upload-image:
 *   post:
 *     summary: Upload director image
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [chairman, board-member, director, deputy-director, provincial-director]
 *         description: Type of director
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
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post('/:type/upload-image', ...uploadDirectorImage);

/**
 * @swagger
 * /admin/api/directors/{type}/delete-image:
 *   delete:
 *     summary: Delete director image
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [chairman, board-member, director, deputy-director, provincial-director]
 *         description: Type of director
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/:type/delete-image', deleteDirectorImage);

/**
 * @swagger
 * /admin/api/directors/{type}/{id}/upload-image:
 *   post:
 *     summary: Upload director image by ID
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [board-member, director, deputy-director, provincial-director]
 *         description: Type of director
 *       - name: id
 *         in: path
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
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post('/:type/:id/upload-image', ...uploadDirectorImage);

/**
 * @swagger
 * /admin/api/directors/{type}/{id}/delete-image:
 *   delete:
 *     summary: Delete director image by ID
 *     tags: [Directors Management]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [board-member, director, deputy-director, provincial-director]
 *         description: Type of director
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Director ID
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/:type/:id/delete-image', deleteDirectorImage);

// =============================
// BOARD MEMBERS ROUTES
// =============================

router.get('/board-members', getBoardMembers);
router.get('/board-members/:id', idValidation, validateRequest, getBoardMemberById);
router.post('/board-members', boardMemberValidation, validateRequest, createBoardMember);
router.put('/board-members/:id', idValidation.concat(boardMemberValidation), validateRequest, updateBoardMember);
router.delete('/board-members/:id', idValidation, validateRequest, deleteBoardMember);

// =============================
// DIRECTORS ROUTES
// =============================

router.get('/directors', getDirectors);
router.get('/directors/:id', idValidation, validateRequest, getDirectorById);
router.post('/directors', directorValidation, validateRequest, createDirector);
router.put('/directors/:id', idValidation.concat(directorValidation), validateRequest, updateDirector);
router.delete('/directors/:id', idValidation, validateRequest, deleteDirector);

// =============================
// DEPUTY DIRECTORS ROUTES
// =============================

router.get('/deputy-directors', getDeputyDirectors);
router.get('/deputy-directors/:id', idValidation, validateRequest, getDeputyDirectorById);
router.post('/deputy-directors', deputyDirectorValidation, validateRequest, createDeputyDirector);
router.put('/deputy-directors/:id', idValidation.concat(deputyDirectorValidation), validateRequest, updateDeputyDirector);
router.delete('/deputy-directors/:id', idValidation, validateRequest, deleteDeputyDirector);

// =============================
// ASSISTANT DIRECTORS ROUTES
// =============================

router.get('/assistant-directors', getAssistantDirectors);
router.get('/assistant-directors/:id', idValidation, validateRequest, getAssistantDirectorById);
router.post('/assistant-directors', assistantDirectorValidation, validateRequest, createAssistantDirector);
router.put('/assistant-directors/:id', idValidation.concat(assistantDirectorValidation), validateRequest, updateAssistantDirector);
router.delete('/assistant-directors/:id', idValidation, validateRequest, deleteAssistantDirector);

// =============================
// PROVINCIAL DIRECTORS ROUTES
// =============================

router.get('/provincial-directors', getProvincialDirectors);
router.get('/provincial-directors/:id', idValidation, validateRequest, getProvincialDirectorById);
router.post('/provincial-directors', provincialDirectorValidation, validateRequest, createProvincialDirector);
router.put('/provincial-directors/:id', idValidation.concat(provincialDirectorValidation), validateRequest, updateProvincialDirector);
router.delete('/provincial-directors/:id', idValidation, validateRequest, deleteProvincialDirector);

// =============================
// PROVINCIAL ASSISTANTS ROUTES
// =============================

router.get('/provincial-assistants', getProvincialAssistants);
router.get('/provincial-assistants/:id', idValidation, validateRequest, getProvincialAssistantById);
router.post('/provincial-assistants', provincialAssistantValidation, validateRequest, createProvincialAssistant);
router.put('/provincial-assistants/:id', idValidation.concat(provincialAssistantValidation), validateRequest, updateProvincialAssistant);
router.delete('/provincial-assistants/:id', idValidation, validateRequest, deleteProvincialAssistant);

export default router;