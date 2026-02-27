import { body, validationResult } from 'express-validator';

export const validateQuoteRequest = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\-\(\)\+]+$/).withMessage('Please provide a valid phone number'),

  body('address')
    .trim()
    .notEmpty().withMessage('Property address is required')
    .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters'),

  body('insuranceType')
    .trim()
    .notEmpty().withMessage('Insurance type is required')
    .isIn(['home', 'auto', 'bundle', 'flood', 'business', 'umbrella', 'boat', 'other'])
    .withMessage('Invalid insurance type selected'),

  body('coverageDetails')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Coverage details must not exceed 2000 characters'),

  body('contactPreference')
    .optional()
    .isBoolean().withMessage('Contact preference must be a boolean value')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};
