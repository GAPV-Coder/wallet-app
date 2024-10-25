/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import config from '../configuration/config.js';

const { DB_URL } = config;

mongoose.connection.setMaxListeners(0);

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DB_URL);
        console.log('Successful database connection');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
