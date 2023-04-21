import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
require('dotenv').config();

import * as middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

import indexRouter from './routers/index';
import guestRouter from "./routers/guest";

app.use('/', indexRouter);
app.use('/guest', guestRouter)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
