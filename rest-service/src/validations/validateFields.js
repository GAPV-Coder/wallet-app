/* eslint-disable newline-per-chained-call */
import { body } from 'express-validator';

export const registerClientValidationRules = [
    body('document')
        .notEmpty().withMessage('The field “document” is required')
        .isString().withMessage('The “document” field must be a string'),
    body('name')
        .notEmpty().withMessage('The field “name” is required')
        .isString().withMessage('The “name” field must be a string'),
    body('email')
        .notEmpty().withMessage('The “email” field is required')
        .isEmail().withMessage('The “email” field must be a valid email'),
    body('phone')
        .notEmpty().withMessage('The “phone” field is required')
        .isString().withMessage('Field “phone” must be a string')
        .isLength({ min: 10, max: 15 }).withMessage('The “phone” field must be between 10 and 15 characters'),
];
