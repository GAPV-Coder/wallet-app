/* eslint-disable import/extensions */
import express from 'express';
import config from './configuration/config.js';
import connectDB from './database/connection.js';

const { PORT } = config || 8080;

const app = express();

// Initialize application
const httpServer = app.listen(PORT, () => {
    console.log(`SOAP listening on port ${PORT}`);
});

// Database connection
connectDB();
