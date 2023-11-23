import AppError from "../helpers/AppError";
import User, { IUser } from "../models/User";

export default class UserRepository {

    public async findById(id: number) {
        const users = await User.findAll({ where: { id }, attributes: { exclude: ['password']}});
        if (users.length) return users[0];
        return null;
    }

    public async createUser(record: IUser) {
       try {
            record.id = undefined;
            await this.existsEmail(record.email);
            await this.existsCpf(record.cpf);
            await this.existsCnpj(record.cnpj);
        
            const user = await User.create(record as User);

            const users = await User.findAll({ where: { id: user.id }, attributes: { exclude: ['password']}});

            return users[0];
       } catch (error: any) {

            if (error instanceof AppError) {
                throw error;
            }
        
            throw new AppError('Não foi possível criar o usuário. Preencha os campos necessários.', 400);
       } 
    }

    private async existsCpf(cpf?: string, cpfCompare?: string) {
        if (!cpf) return;
        const exist = (await User.findAll({ where: { cpf }})).length > 0;

        if ((cpfCompare && cpf !== cpfCompare && exist) || exist) {
            throw new AppError('CPF já cadastrado.')
        }

    }
    private async existsCnpj(cnpj?: string, cnpjCompare?: string) {
        if (!cnpj) return;
        const exist = (await User.findAll({ where: { cnpj }})).length > 0;

        if ((cnpjCompare && cnpj !== cnpjCompare && exist) || exist) {
            throw new AppError('CPNJ já cadastrado.')
        }

    }

    private async existsEmail(email?: string, emailCompare?: string) {
        if (!email) return;
        const exist = (await User.findAll({ where: { email }})).length > 0;

        if ((emailCompare && email !== emailCompare && exist) || exist) {
            throw new AppError('E-mail já cadastrado.')
        }

    }

    public async updateUser(id: number, record: IUser) {
        try {
            record.id = undefined;
            const user = await this.findById(id);

            if (!user) {
                throw new AppError('Usuário não encontrado.', 404)
            } 

            await this.existsCpf(record.cpf, user.cpf);

            await this.existsCnpj(record.cnpj, user.cnpj);

            await this.existsEmail(record.email, user.email);

            const updatedUser: IUser = { ...user.dataValues, ...record};

            await User.update(updatedUser, { where: { id } });

            return (await User.findAll({ where: { id }, attributes: { exclude: ['password']} }))[0]; 

        } catch (error: any) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Não foi possível atualizar o usuário específicado.');
        }
    }

    public async deleteUser(id: number) {
        const countDeleted = await User.destroy({ where: { id }})
        return countDeleted > 0;
    }

    public async findAll(pageSize: number = 10, page: number = 1, limit: number = 5) {
        return await User.findAll({
            offset: (page - 1) * pageSize, 
            limit: limit,
            order: [['id', 'asc']],
            attributes: { exclude: ['password'] }
        });
    }
    

}