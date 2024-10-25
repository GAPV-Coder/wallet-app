/* eslint-disable import/extensions */
import express from 'express';
import soap from 'soap';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import config from './configuration/config.js';
import connectDB from './database/connection.js';
import { service } from './controllers/soapController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT } = config || 8080;

const app = express();

// Upload and configure the WSDL file
const wsdlPath = path.join(__dirname, 'walletService.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf-8');

// Initialize application
app.listen(PORT, () => {
    const soapServer = soap.listen(app, '/wsdl', service, wsdl);
    console.log(`SOAP running on http://localhost:${PORT}/wsdl`);
});

// Database connection
connectDB();
