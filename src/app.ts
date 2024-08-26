import express from 'express';
import cors from 'cors';
import ChatRouter from './Application/Routers/ChatRouter';
import errorHandler from './Application/Middleware/ErrorHandler';

const app = express()
app.use(express.static('public'))
app.use(cors());
app.use('/api', ChatRouter);
app.use(errorHandler);
export default app;