import { Router } from "express";
import transactionRoutes from './transactions';
import userRoutes from './users';

const routes = Router();

routes.use('/transaction', transactionRoutes);
routes.use('/users', userRoutes);

export default routes;