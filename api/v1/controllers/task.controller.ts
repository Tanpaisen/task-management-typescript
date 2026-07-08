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

    //Sắp xếp theo tiêu chí
    const sort: Record<string, 1 | -1> = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = String(req.query.sortKey);
        const sortValue: 1 | -1 = req.query.sortValue === 'asc' ? 1 : -1;
        sort[sortKey] = sortValue;
    }

    //End Sắp xếp theo tiêu chí

    const tasks = await Task.find(find).sort(sort)
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
