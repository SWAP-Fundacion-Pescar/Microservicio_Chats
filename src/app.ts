import express from 'express';
import cors from 'cors';

const app = express()
app.use(express.static('public'))
app.use(cors());

export default app;