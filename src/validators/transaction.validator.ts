import { body } from 'express-validator';

export const validateTransfer = [
  body('from')
    .exists()
    .withMessage('from is required')
    .bail()
    .isInt()
    .withMessage('from must be a number'),
  body('to')
    .exists()
    .withMessage('to is required')
    .bail()
    .isInt()
    .withMessage('to must be a number'),
  body('amount')
    .exists()
    .withMessage('amount is required')
    .bail()
    .isInt({ min: 1, max: 1_000_000 }),
  body('description')
    .optional() // validates the field only if it is present
    .isString()
    .withMessage('description must be a string')
];
