/* eslint-disable import/extensions */
import { registerClient } from '../services/serviceMethods.js';

export const service = {
    WalletService: {
        WalletPort: {
            registerClient: async (args) => {
                const { document, name, email, phone } = args;
                console.log('Request received on server -->', args);
                const response = await registerClient({ document, name, email, phone });
                console.log('User registration response -->', response);
                return {
                    success: response.success,
                    code_error: response.code_error,
                    message_error: response.message_error,
                    data: JSON.stringify(response.data),
                };
            },
        },
    },
};
