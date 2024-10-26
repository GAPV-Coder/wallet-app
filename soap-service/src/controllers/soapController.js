/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { confirmPayment, getBalance, pay, rechargeWallet, registerClient } from '../services/serviceMethods.js';

export const service = {
    WalletService: {
        WalletPort: {
            registerClient: async (args) => {
                const { document, name, email, phone } = args;
                const response = await registerClient({ document, name, email, phone });
                return {
                    success: response.success,
                    code_error: response.code_error,
                    message_error: response.message_error,
                    data: JSON.stringify(response.data),
                };
            },
            rechargeWallet: async (args) => {
                const { document, phone, amount } = args;
                const response = await rechargeWallet({ document, phone, amount });
                return {
                    success: response.success,
                    code_error: response.code_error,
                    message_error: response.message_error,
                };
            },
            pay: async (args) => {
                const { document, phone, amount } = args;
                console.log('Payment request received -->', args);
                const response = await pay({ document, phone, amount });
                console.log('Payment response -->', response);
                return {
                    success: response.success,
                    code_error: response.code_error,
                    message_error: response.message_error,
                    sessionId: response.sessionId || null,
                    token: response.token || null,
                };
            },
            confirmPayment: async (args) => {
                const { sessionId, token } = args;
                const response = await confirmPayment({ sessionId, token });
                return {
                    success: response.success,
                    code_error: response.code_error,
                    message_error: response.message_error,
                };
            },
            getBalance: async (args) => {
                const { document, phone } = args;
                const response = await getBalance({ document, phone });
                return {
                    success: response.success,
                    balance: response.balance,
                    code_error: response.code_error,
                    message_error: response.message_error,
                };
            },
        },
    },
};
