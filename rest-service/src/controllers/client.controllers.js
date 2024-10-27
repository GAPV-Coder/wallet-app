/* eslint-disable import/extensions */
import { validationResult } from 'express-validator';
import { rechargeWalletService, registerClientService } from '../services/client.services.js';

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