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
