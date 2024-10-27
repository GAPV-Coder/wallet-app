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

        if (!response || !response.success) {
            throw new Error('Invalid or unsuccessful SOAP response');
        }
        return response;
    } catch (error) {
        console.error('Error in payment service:', error);
        throw new Error(`Error when making payment: ${error.message}`);
    }
};
