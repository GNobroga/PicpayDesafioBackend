import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.APP_DB_NAME;
const DB_USER = process.env.APP_DB_USER;
const DB_PASSWORD = process.env.APP_DB_PASSWORD;
const DB_PORT = process.env.APP_DB_PORT;
const DB_HOST = process.env.APP_DB_HOST;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_PORT || !DB_HOST) {
    throw new Error('Variáveis de ambiente para o banco de dados não configuradas corretamente.');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
});

export default sequelize;
