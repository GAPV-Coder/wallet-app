/* eslint-disable import/extensions */
import { convertAndSendtoSoap } from '../helpers/convert.js';

export const registerClientService = async (clientData) => {
    try {
        const response = await convertAndSendtoSoap(clientData);
        console.log('Response from to service', response);
        return response;
    } catch (error) {
        throw new Error(`Error when registering customer: ${error.message}`);
    }
};
