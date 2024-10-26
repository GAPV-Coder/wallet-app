import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    soap_url: process.env.SOAP_SERVICE_URL,
};

export default config;
