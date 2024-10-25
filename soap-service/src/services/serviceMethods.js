/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import ClientModel from '../models/client.model.js';

export const registerClient = async ({ document, name, email, phone }) => {
    try {
        const existingClient = await ClientModel.findOne({ document });
        if (existingClient) {
            return {
                success: false,
                code_error: '01',
                message_error: 'Client alredy exits',
                data: null,
            };
        }
        const client = new ClientModel({ document, name, email, phone });
        await client.save();

        return {
            success: true,
            code_error: '00',
            message_error: 'Client registered successfully',
            data: client,
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return {
            success: false,
            code_error: '02',
            message_error: 'Registration failed',
            data: null,
        };
    }
};

export const rechargeWallet = async ({ document, phone, amount }) => {
    try {
        const rechargeAmount = parseFloat(amount);
        if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
            return {
                success: false,
                code_error: '04',
                message_error: 'Invalid recharge amount',
                data: null,
            };
        }

        const client = await ClientModel.find({ document, phone }).lean();
        if (!client) {
            return {
                success: false,
                code_error: '01',
                message_error: 'Client not found',
                data: null,
            };
        }

        client.balance = parseFloat(client.balance) || 0;
        client.balance += rechargeAmount;
        await ClientModel.updateOne({ document, phone }, { balance: client.balance });

        return {
            success: true,
            code_error: '00',
            message_error: 'Wallet recharged successfully',
            data: client,
        };
    } catch (error) {
        console.error('Error during wallet recharge:', error);
        return {
            success: false,
            code_error: '02',
            message_error: 'Recharge failed',
            data: null,
        };
    }
};
