/* eslint-disable import/extensions */
import { validationResult } from 'express-validator';
import { getBalanceService, paymentConfirmationService, paymentService, rechargeWalletService, registerClientService } from '../services/client.services.js';

export const registerClientController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const clientData = req.body;
        const response = await registerClientService(clientData);

        res.status(200).json({
            message: 'Client registered successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error when registering client: ${error.message}`,
        });
    }
};

export const rechargeWalletController = async (req, res) => {
    const { document, phone, amount } = req.body;

    try {
        const response = await rechargeWalletService({ document, phone, amount });
        res.status(200).json({
            message: 'Wallet recharged successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error when recharging wallet: ${error.message}`,
        });
    }
};

export const paymentController = async (req, res) => {
    const { document, phone, amount } = req.body;
    try {
        const response = await paymentService({ document, phone, amount });
        console.log('Response paymentController:', response);
        res.status(200).json({
            message: 'Payment made successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error when making payment: ${error.message}`,
        });
    }
};

export const paymentConfirmationController = async (req, res) => {
    const { sessionId, token } = req.body;
    try {
        const response = await paymentConfirmationService({ sessionId, token });
        res.status(200).json({
            message: 'Payment confirmed successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error when confirming payment: ${error.message}`,
        });
    }
};

export const getBalanceController = async (req, res) => {
    const { document, phone } = req.body;
    try {
        const response = await getBalanceService({ document, phone });
        res.status(200).json({
            message: 'Balance retrieved successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error when retrieving balance: ${error.message}`,
        });
    }
};
