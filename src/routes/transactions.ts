import { Router } from "express";
import TransactionController from "../controllers/TransactionController";

const transactionController = new TransactionController();
const routes = Router();
routes.post('/', transactionController.makeTransaction);
export default routes;