import AppError from "../helpers/AppError";
import { IUser } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import Validators from "../helpers/Validators";

export default class UserService {

    private readonly _repository = new UserRepository();

    public async findOne(id: number) {
        if (Number.isNaN(id)) {
            throw new AppError('O Id não é um identificador válido.', 400);
        }

        const user = await this._repository.findById(id);
        
        if (!user) {
            throw new AppError('Não há usuário com este Id ' + id, 404);
        }

        return user;
    }


    public async create(record: IUser) {

        if (record.cnpj && !Validators.validateCNPJ(record.cnpj)) {
            throw new AppError('Formato de CNPJ inválido.');
        }

        if (record.cpf && !Validators.validateCPF(record.cpf)) {
            throw new AppError('Formato de CPF inválido.');
        }

        return await this._repository.createUser(record);
    }

    public async update(id: number, record: IUser) {

        if (record.cnpj && !Validators.validateCNPJ(record.cnpj)) {
            throw new AppError('Formato de CNPJ inválido.');
        }

        if (record.cpf && !Validators.validateCPF(record.cpf)) {
            throw new AppError('Formato de CPF inválido.');
        }

        return await this._repository.updateUser(id, record);
    }

    public async delete(id: number) {
        return await this._repository.deleteUser(id);
    }

    public async findAll(pageSize: number = 10, page: number = 1, limit: number = 5) {
        page = page < 0 ? 1 : page;
        pageSize = pageSize > 40 ? 40 : pageSize < 0 ? 5 : pageSize;
        limit = limit > 40 ? 40 : limit < 0 ? 1 : limit;
        return await this._repository.findAll(pageSize, page, limit);
    }
}