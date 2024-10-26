/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import { generateTokenAndSessionId } from '../helpers/generateTokenAndSessionId.js';
import { sendPaymentMail } from '../helpers/sendEmail.js';
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

export const pay = async ({ document, phone, amount }) => {
    try {
        const client = await ClientModel.findOne({ document, phone });

        if (!client) {
            return {
                success: false,
                code_error: '01',
                message_error: 'Client not found',
            };
        }

        if (client.balance < amount) {
            return {
                success: false,
                code_error: '05',
                message_error: 'Insufficient balance',
            };
        }

        const { sessionId, token } = generateTokenAndSessionId();

        client.balance -= amount;
        await client.save();

        console.log('Preparing to send email to:', client.email);
        const emailResponse = await sendPaymentMail(client.email, sessionId, token);
        console.log('Email response:', emailResponse);
        if (!emailResponse) {
            return {
                success: false,
                code_error: '05',
                message_error: 'Failed to send confirmation email',
            };
        }

        return {
            success: true,
            code_error: '00',
            message_error: 'Payment processed successfully!',
        };
    } catch (error) {
        console.error('Error during payment processing: ', error);
        return {
            success: false,
            code_error: '02',
            message_error: 'Payment failed',
        };
    }
};
