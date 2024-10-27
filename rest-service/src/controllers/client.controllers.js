/* eslint-disable import/extensions */
import { validationResult } from 'express-validator';
import { registerClientService } from '../services/client.services.js';

export const registerClientController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const clientData = req.body;
        console.log('Data of client', clientData);
        const response = await registerClientService(clientData);
        console.log('Response from to controller', response);
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
