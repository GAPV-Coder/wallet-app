/* eslint-disable import/extensions */
import { Router } from 'express';
import clientRoutes from './client.routes.js';

const routerApi = Router();

routerApi.use('/client', clientRoutes);

export default routerApi;
