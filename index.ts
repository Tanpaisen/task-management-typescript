import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './config/database';
import Task from './models/tasks.model';

dotenv.config();
database.connect();

const app: Express = express();

const port: number | string = process.env.PORT || 3000;
app.get('/', async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find({
        deleted: false
    })
    res.json(tasks)
});

app.get('/detail/:id', async (req: Request, res: Response): Promise<void>  => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
});

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
})