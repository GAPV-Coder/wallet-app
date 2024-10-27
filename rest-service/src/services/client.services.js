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
