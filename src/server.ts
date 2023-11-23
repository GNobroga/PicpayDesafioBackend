import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import dbContext from './data/dbContext';
import AppError from './helpers/AppError';
import swaggerDocument from './swagger.json';

async function startServer() {
    try {
        await dbContext.sync({ logging: false });
        await dbContext.authenticate();
        
        dotenv.config();
        
        const SERVER_PORT = process.env.APP_SERVER_PORT ?? 8080;
        const app = express();
        
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(express.json());
        app.use(cors());
        app.use(routes);
      
        app.get('/', (req, res) => res.redirect('/users'));
    
        app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
            res.status(error instanceof AppError ? error.statusCode : 500);
            return res.json({ error: error.message });
        });
    
        app.listen(SERVER_PORT, () => console.log(`O servidor está rodando em: http://localhost:${SERVER_PORT}`));
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

startServer();
