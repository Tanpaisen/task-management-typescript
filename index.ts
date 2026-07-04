import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './config/database';
import { routeMainv1 } from './api/v1/routes/index.route';

dotenv.config();
database.connect();

const app: Express = express();
routeMainv1(app);

const port: number | string = process.env.PORT || 3000;



app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
})