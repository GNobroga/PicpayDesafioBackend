import { Request, Response, NextFunction } from "express";
import TransactionService from "../services/TransactionService";
export default class TransactionController {

    private static readonly _service = new TransactionService();

    public async makeTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const done = await TransactionController._service.makeTransfer(req.body);
            return res.json({ status: 'success', message: 'Transferência concluída com sucesso', done })
        } catch (error) { next(error) }
    }
}