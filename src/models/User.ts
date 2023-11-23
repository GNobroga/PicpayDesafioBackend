import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import dbContext from '../data/dbContext';

export interface IUser {
    id?: number;
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string;
    wallet?: number;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare email: string;
    declare password: string;
    declare cpf: string;
    declare cnpj: CreationOptional<string>;
    declare wallet: CreationOptional<number>;
}

User.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    wallet: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    }

}, { sequelize: dbContext, timestamps: false });

export default User;