/* eslint-disable import/extensions */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config.js';
import routes from './routes/index.js';

const { port } = config || 8080;

const app = express();

// Middleware's
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/', routes);

// Initialize application
const httpServer = app.listen(port, () => {
    console.log(`API REST running on port: ${port}`);
});
