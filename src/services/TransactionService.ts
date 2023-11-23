import sequelize from "../data/dbContext";
import AppError from "../helpers/AppError";
import User from "../models/User";
import UserRepository from "../repositories/UserRepository";
import AuthorizerService from "./AuthorizerService";
import SendMailerService from "./SendMailerService";

interface ITransferDetails {
    senderId: number;
    recipientId: number;
    amount: number;
}

export default class TransactionService {
    
    private static readonly _repository = new UserRepository();
    private static readonly _mailer = new SendMailerService();
    private static readonly _authorizer = new AuthorizerService();
    
    public async makeTransfer({ senderId, recipientId, amount }: ITransferDetails) {
        const sender = await TransactionService._repository.findById(senderId);
        const recipient = await TransactionService._repository.findById(recipientId);

        if (!sender || !recipient) {
            throw new AppError('Usuário comum ou lojista não existem.', 404);
        }

        if (sender.cnpj) {
            throw new AppError('Usuário lojista apenas pode receber pagamento.', 400);
        }

        if (amount <= 0) {
            throw new AppError('Valor transferido é menor ou igual a zero.', 400);
        }

        if (sender.wallet <= 0 || sender.wallet < amount) {
            throw new AppError('Saldo insuficiente para transferir.', 400);
        } 

        if (!await TransactionService._authorizer.authorize()) {
            throw new AppError('Não autorizado para fazer essa operação no momento.', 403);
        }

        await this.deductBalances(sender, recipient, amount);

        if (!await TransactionService._mailer.send()) {
            console.error('Não foi possível enviar o e-mail de confirmação.');
        }

        return true;
    }

    public async deductBalances(sender: User, recipient: User, amount: number) {
        if (!await this.applyTransaction(sender, recipient, amount)) {
            throw new AppError('Um erro ocorreu durante a transferência de recursos.');
         }
    }

    public async applyTransaction(sender: User, recipient: User, amount: number) {
        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            await User.update({ wallet: sequelize.literal(`wallet - ${amount}`) }, { where: { id: sender.id }, transaction });
            await User.update({ wallet: sequelize.literal(`wallet + ${amount}`) }, { where: { id: recipient.id }, transaction });
            await transaction.commit();
        } catch (error: any) {
            await transaction.rollback();
            throw new AppError('Erro durante a transação no banco de dados.', 500);
        }
        return true;
    }


}