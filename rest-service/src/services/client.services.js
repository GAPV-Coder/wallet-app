/* eslint-disable import/extensions */
import { convertAndSendtoSoap } from '../helpers/convert.js';

export const registerClientService = async (clientData) => {
    try {
        const response = await convertAndSendtoSoap('registerClient', clientData);
        console.log('Response from to service', response);
        return response;
    } catch (error) {
        throw new Error(`Error when registering customer: ${error.message}`);
    }
};

export const rechargeWalletService = async ({ document, phone, amount }) => {
    try {
        const response = await convertAndSendtoSoap('rechargeWallet', { document, phone, amount });
        const msg = response.message || 'No message available';
        const data = response.data || null;
        return { msg, data };
    } catch (error) {
        throw new Error(`Error when recharging wallet: ${error.message}`);
    }
};

export const paymentService = async ({ document, phone, amount }) => {
    try {
        const response = await convertAndSendtoSoap('pay', { document, phone, amount });
        console.log('Response paymentService:', response);

        if (response && typeof response === 'object') {
            const msg = response.message || 'No message available';
        } else {
            console.error('Unexpected response: null value or not an object');
        }

        if (!response || !response.success) {
            throw new Error('Invalid or unsuccessful SOAP response');
        }
        return response;
    } catch (error) {
        console.error('Error in payment service:', error);
        throw new Error(`Error when making payment: ${error.message}`);
    }
};

export const paymentConfirmationService = async ({ sessionId, token }) => {
    try {
        const response = await convertAndSendtoSoap('confirmPayment', { sessionId, token });
        console.log('Response payment confirmation:', response);
    } catch (error) {
        console.error('Error in payment confirmation service:', error);
    }
};
