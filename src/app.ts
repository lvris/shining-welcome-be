import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {expressjwt} from "express-jwt";
require('dotenv').config();

import * as middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const tokenKey = process.env.TOKEN_KEY ?? 'shining';
app.use(expressjwt({
  secret: tokenKey,
  algorithms: ['HS512'],
  credentialsRequired: false,
}).unless({
  path: [
    { url: '/guest', methods: ['POST'] },
  ],
}))
 
import indexRouter from './routers/index';
import guestRouter from "./routers/guest";
import authRouter from "./routers/auth";

app.use('/api', indexRouter);
app.use('/api/guest', guestRouter);
app.use('/api/auth', authRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
