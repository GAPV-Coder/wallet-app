/* eslint-disable import/extensions */
import express from 'express';
import { registerClientController } from '../controllers/client.controllers.js';
import { registerClientValidationRules } from '../validations/validateFields.js';

const router = express.Router();

router.post('/register', registerClientValidationRules, registerClientController);

export default router;
