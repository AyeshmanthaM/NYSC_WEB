import { body } from 'express-validator';

// Common validation patterns
const nameValidation = body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ min: 2, max: 100 })
  .withMessage('Name must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s.'-]+$/)
  .withMessage('Name must contain only letters, spaces, periods, hyphens, and apostrophes');

const positionValidation = body('position')
  .trim()
  .notEmpty()
  .withMessage('Position is required')
  .isLength({ min: 5, max: 150 })
  .withMessage('Position must be between 5 and 150 characters');

const descriptionValidation = body('description')
  .trim()
  .notEmpty()
  .withMessage('Description is required')
  .isLength({ max: 1000 })
  .withMessage('Description must not exceed 1000 characters');

const emailValidation = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Must be a valid email address')
  .matches(/@nysc\.lk$/)
  .withMessage('Email must end with @nysc.lk')
  .normalizeEmail();

const phoneValidation = body('phone')
  .trim()
  .notEmpty()
  .withMessage('Phone number is required')
  .matches(/^\+94\s\d{2}\s\d{3}\s\d{4}$/)
  .withMessage('Phone must be in Sri Lankan format: +94 XX XXX XXXX');

const linkedinValidation = body('linkedin')
  .optional()
  .trim()
  .isURL({ protocols: ['http', 'https'] })
  .withMessage('LinkedIn must be a valid URL');

const imageValidation = body('image')
  .optional()
  .trim()
  .isString()
  .withMessage('Image must be a string');

const departmentValidation = body('department')
  .trim()
  .notEmpty()
  .withMessage('Department is required')
  .isLength({ min: 2, max: 100 })
  .withMessage('Department must be between 2 and 100 characters');

const specializationValidation = body('specialization')
  .optional()
  .trim()
  .isLength({ max: 100 })
  .withMessage('Specialization must not exceed 100 characters');

const experienceValidation = body('experience')
  .optional()
  .trim()
  .matches(/^\d+(\.\d+)?\s+(years?|months?)$/i)
  .withMessage('Experience must be in format: "X years" or "X months"');

// Chairman Validation
export const chairmanValidation = [
  nameValidation,
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title must not exceed 200 characters'),
  descriptionValidation,
  emailValidation,
  phoneValidation,
  linkedinValidation,
  imageValidation,
  body('tenure')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Tenure must not exceed 50 characters'),
  body('qualifications')
    .optional()
    .isArray()
    .withMessage('Qualifications must be an array')
    .custom((value) => {
      if (value && value.length > 20) {
        throw new Error('Maximum 20 qualifications allowed');
      }
      return true;
    }),
  body('achievements')
    .optional()
    .isArray()
    .withMessage('Achievements must be an array')
    .custom((value) => {
      if (value && value.length > 50) {
        throw new Error('Maximum 50 achievements allowed');
      }
      return true;
    }),
  body('vision')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Vision must not exceed 2000 characters'),
  body('keyInitiatives')
    .optional()
    .isArray()
    .withMessage('Key initiatives must be an array')
    .custom((value) => {
      if (value && value.length > 20) {
        throw new Error('Maximum 20 key initiatives allowed');
      }
      return true;
    }),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Board Member Validation
export const boardMemberValidation = [
  nameValidation,
  positionValidation,
  descriptionValidation,
  emailValidation,
  phoneValidation,
  linkedinValidation,
  imageValidation,
  body('badge')
    .optional()
    .trim()
    .isIn(['Chairman', 'Member', 'Secretary', 'Treasurer', 'Vice Chairman'])
    .withMessage('Badge must be one of: Chairman, Member, Secretary, Treasurer, Vice Chairman'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Director Validation
export const directorValidation = [
  nameValidation,
  positionValidation,
  departmentValidation,
  descriptionValidation,
  emailValidation,
  phoneValidation,
  linkedinValidation,
  imageValidation,
  specializationValidation,
  experienceValidation,
  body('achievements')
    .optional()
    .isArray()
    .withMessage('Achievements must be an array')
    .custom((value) => {
      if (value && value.length > 30) {
        throw new Error('Maximum 30 achievements allowed');
      }
      return true;
    }),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Deputy Director Validation
export const deputyDirectorValidation = [
  nameValidation,
  positionValidation,
  departmentValidation,
  descriptionValidation,
  emailValidation,
  phoneValidation,
  linkedinValidation,
  specializationValidation,
  body('provinces')
    .optional()
    .isArray()
    .withMessage('Provinces must be an array')
    .custom((value) => {
      if (value && value.length > 9) {
        throw new Error('Maximum 9 provinces allowed');
      }
      const validProvinces = [
        'Western', 'Central', 'Southern', 'Northern', 'Eastern',
        'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
      ];
      if (value && value.some((province: string) => !validProvinces.includes(province))) {
        throw new Error('Invalid province name');
      }
      return true;
    }),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Assistant Director Validation
export const assistantDirectorValidation = [
  nameValidation,
  positionValidation,
  departmentValidation,
  emailValidation,
  phoneValidation,
  body('region')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Region must not exceed 100 characters'),
  specializationValidation,
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Provincial Director Validation
export const provincialDirectorValidation = [
  nameValidation,
  positionValidation,
  body('province')
    .trim()
    .notEmpty()
    .withMessage('Province is required')
    .isIn([
      'Western', 'Central', 'Southern', 'Northern', 'Eastern',
      'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
    ])
    .withMessage('Invalid province name'),
  body('headquarters')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Headquarters must not exceed 100 characters'),
  body('districts')
    .optional()
    .isArray()
    .withMessage('Districts must be an array')
    .custom((value) => {
      if (value && value.length > 5) {
        throw new Error('Maximum 5 districts per province');
      }
      return true;
    }),
  body('population')
    .optional()
    .trim()
    .matches(/^\d+(\.\d+)?[KM]?$/)
    .withMessage('Population must be in format: "5.8M" or "580K"'),
  body('centers')
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage('Centers must be a number between 0 and 1000'),
  descriptionValidation,
  emailValidation,
  phoneValidation,
  linkedinValidation,
  body('achievements')
    .optional()
    .isArray()
    .withMessage('Achievements must be an array')
    .custom((value) => {
      if (value && value.length > 20) {
        throw new Error('Maximum 20 achievements allowed');
      }
      return true;
    }),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Provincial Assistant Validation
export const provincialAssistantValidation = [
  nameValidation,
  positionValidation,
  body('province')
    .trim()
    .notEmpty()
    .withMessage('Province is required')
    .isIn([
      'Western', 'Central', 'Southern', 'Northern', 'Eastern',
      'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
    ])
    .withMessage('Invalid province name'),
  body('district')
    .trim()
    .notEmpty()
    .withMessage('District is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('District must be between 2 and 50 characters'),
  body('headquarters')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Headquarters must not exceed 100 characters'),
  body('population')
    .optional()
    .trim()
    .matches(/^\d+(\.\d+)?[KM]?$/)
    .withMessage('Population must be in format: "2.3M" or "230K"'),
  body('centers')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Centers must be a number between 0 and 100'),
  emailValidation,
  phoneValidation,
  specializationValidation,
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];