import { Request, Response } from 'express';
import Task from '../../../models/tasks.model';

export const index = async (req: Request, res: Response): Promise<void> => {
    interface Find {
        deleted: boolean,
        status?: string
    }

    const find: Find = {
        deleted: false
    }

    //Lọc theo trạng thái
    if (req.query.status) {
        find["status"] = req.query.status.toString()
    }
    //End lọc theo trạng thái

    const tasks = await Task.find(find)
    res.json(tasks)
};

export const detail = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
};
