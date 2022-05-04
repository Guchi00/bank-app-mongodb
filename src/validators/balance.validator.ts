import { body, param } from 'express-validator';

export const validateCreate = [
  body('balance')
    .exists() // check if it exists in body
    .withMessage('balance is required') // error message for above check
    .bail() // end validation if above check failed
    .isInt({ min: 1, max: 1_000_000 }) // check that it is a number
    .withMessage('Enter a number between 0 and 1 million')
];

export const validateGet = [
  param('accountNumber')
    .exists() // check that it exists in param
    .withMessage('Param "accountNumber" is required')
    .bail() // end validation
    .isInt({ min: 1 }) // check that it is a number
    .withMessage('accountNumber must be a positive number')
];
