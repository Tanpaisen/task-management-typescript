import { Request, Response, Router } from 'express';
import Task from '../../../models/tasks.model';
export const routerTask: Router = Router()

routerTask.get('/', async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find({
        deleted: false
    })
    res.json(tasks)
});

routerTask.get('/detail/:id', async (req: Request, res: Response): Promise<void>  => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
});
