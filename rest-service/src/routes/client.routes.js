/* eslint-disable import/extensions */
import express from 'express';
import { getBalanceController, paymentConfirmationController, paymentController, rechargeWalletController, registerClientController } from '../controllers/client.controllers.js';
import { registerClientValidationRules } from '../validations/validateFields.js';

const router = express.Router();

router.post('/register', registerClientValidationRules, registerClientController);

router.post('/recharge-wallet', rechargeWalletController);

router.post('/payment', paymentController);

router.post('/confirm-payment', paymentConfirmationController);

router.post('/get-balance', getBalanceController);

export default router;
