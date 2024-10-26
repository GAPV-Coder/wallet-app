/* eslint-disable import/extensions */
import nodemailer from 'nodemailer';
import config from '../configuration/config.js';

// const { EMAIL, PASSWORD } = config;

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
        user: config.SMTP_EMAIL,
        pass: config.SMTP_PASSWORD,
    },
});

export const sendPaymentMail = async (email, sessionId, token) => {
    const mailOptions = {
        from: 'MS_cdRucF@trial-v69oxl5reyrg785k.mlsender.net',
        to: email,
        subject: 'Payment Confirmation',
        text: `Your payment confirmation for session ${sessionId} is: ${token}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent Successfully!');
        return true;
    } catch (error) {
        console.log('Error sending Email: ', error);
        return false;
    }
};
