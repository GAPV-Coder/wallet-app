/* eslint-disable import/extensions */
import nodemailer from 'nodemailer';

const userGmail = 'gpereiravilla@gmail.com';
const passAppGmail = 'xqbm surx diut hhjn';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: userGmail,
        pass: passAppGmail,
    },
});

export const sendPaymentMail = async (email, sessionId, token) => {
    const mailOptions = {
        from: userGmail,
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
