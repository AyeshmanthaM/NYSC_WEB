import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { translationController } from '../controllers/translationController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = Router();

// Validation rules
const createTranslationValidation = [
  body('namespace').notEmpty().isLength({ min: 1, max: 50 }).withMessage('Namespace is required and must be 1-50 characters'),
  body('key').notEmpty().isLength({ min: 1, max: 100 }).withMessage('Key is required and must be 1-100 characters'),
  body('language').isIn(['en', 'si', 'ta']).withMessage('Language must be one of: en, si, ta'),
  body('value').notEmpty().withMessage('Value is required')
];

const updateTranslationValidation = [
  param('id').isUUID().withMessage('Invalid translation ID'),
  body('value').notEmpty().withMessage('Value is required')
];

const bulkUpdateValidation = [
  body('updates').isArray({ min: 1 }).withMessage('Updates array is required'),
  body('updates.*.id').isUUID().withMessage('Each update must have a valid ID'),
  body('updates.*.value').notEmpty().withMessage('Each update must have a value')
];

const deleteTranslationValidation = [
  param('id').isUUID().withMessage('Invalid translation ID')
];

const exportValidation = [
  body('namespace').optional().isLength({ min: 1, max: 50 }),
  body('language').optional().isIn(['en', 'si', 'ta']),
  body('format').optional().isIn(['csv']).withMessage('Format must be csv')
];

// Query validation
const getTranslationsValidation = [
  query('namespace').optional().isLength({ min: 1, max: 50 }),
  query('language').optional().isIn(['en', 'si', 'ta']),
  query('search').optional().isLength({ min: 1, max: 100 }),
  query('isActive').optional().isBoolean()
];

/**
 * Public routes (read-only access)
 */

// GET /api/translations - Get all translations with filters
router.get('/', 
  getTranslationsValidation,
  validateRequest,
  translationController.getTranslations
);

// GET /api/translations/stats - Get translation statistics
router.get('/stats', 
  translationController.getTranslationStats
);

// GET /api/translations/completeness - Check translation completeness
router.get('/completeness', 
  translationController.getTranslationCompleteness
);

// GET /api/translations/:id - Get single translation by ID
router.get('/:id', 
  param('id').isUUID().withMessage('Invalid translation ID'),
  validateRequest,
  translationController.getTranslationById
);

/**
 * Protected routes (require authentication)
 */

// POST /api/translations - Create new translation (requires TRANSLATOR role or higher)
router.post('/',
  authenticate,
  authorize(['ADMIN', 'EDITOR', 'TRANSLATOR']),
  createTranslationValidation,
  validateRequest,
  translationController.createTranslation
);

// PUT /api/translations/:id - Update translation (requires TRANSLATOR role or higher)
router.put('/:id',
  authenticate,
  authorize(['ADMIN', 'EDITOR', 'TRANSLATOR']),
  updateTranslationValidation,
  validateRequest,
  translationController.updateTranslation
);

// PUT /api/translations/bulk - Bulk update translations (requires EDITOR role or higher)
router.put('/bulk',
  authenticate,
  authorize(['ADMIN', 'EDITOR']),
  bulkUpdateValidation,
  validateRequest,
  translationController.bulkUpdateTranslations
);

// DELETE /api/translations/:id - Delete translation (requires EDITOR role or higher)
router.delete('/:id',
  authenticate,
  authorize(['ADMIN', 'EDITOR']),
  deleteTranslationValidation,
  validateRequest,
  translationController.deleteTranslation
);

/**
 * Admin-only routes
 */

// POST /api/translations/import - Import translations from CSV (requires ADMIN role)
router.post('/import',
  authenticate,
  authorize(['ADMIN']),
  translationController.importTranslations
);

// POST /api/translations/export - Export translations to CSV (requires ADMIN role)
router.post('/export',
  authenticate,
  authorize(['ADMIN']),
  exportValidation,
  validateRequest,
  translationController.exportTranslations
);

// POST /api/translations/sync - Sync all translations to files (requires ADMIN role)
router.post('/sync',
  authenticate,
  authorize(['ADMIN']),
  translationController.syncTranslationsToFiles
);

export default router;