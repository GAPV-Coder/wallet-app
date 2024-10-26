import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    SMTP_EMAIL: process.env.EMAIL_USER,
    SMTP_PASSWORD: process.env.PASSWORD_USER,
};

export default config;
