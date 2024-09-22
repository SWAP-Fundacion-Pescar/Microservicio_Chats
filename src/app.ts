import express from 'express';
import cors from 'cors';
import ChatRouter from './Application/Routers/ChatRouter.js';
import errorHandler from './Application/Middleware/ErrorHandler.js';
import MongoDB from './Infrastructure/Persistence/Config/MongoDB.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
MongoDB();
const app = express()
app.use(express.static('public'))
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', ChatRouter);
app.use(errorHandler);
export default app;