import { Request, Response } from 'express';
import Task from '../../../models/tasks.model';
import { paginationHelper } from '../../../helper/pagination';
import searchHelper from '../../../helper/filter-search';

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
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

    //pagination
    const count = await Task.countDocuments(find);
    const objectPage = {
        limitPage: 4,
        currentPage: 1
    }

    const pageData = paginationHelper(req.query, count, objectPage)
    // End pagination

    //Tìm kiếm
    const keyword: string = req.query.keyword?.toString() || '';
    if (keyword) {
        const search = searchHelper(req.query);

        find.title = search.regex;
    }
    //End Tìm kiếm

    const tasks = await Task.find(find).sort(sort).skip(pageData.skipPage).limit(pageData.limitPage)
    res.json({
        code: 200,
        tasks: tasks,
        page: pageData
    })
};

//[GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
};

//[PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    await Task.updateOne({
        _id: id,
        deleted: false
    }, {
        status: req.body.status.toString()
    })
    res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
    })
};

//[POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response): Promise<void> => {
    const tasks = new Task(req.body);
    await tasks.save();
    res.json({
        code: 201,
        message: "Tạo task thành công",
        task: tasks
    })
};


//[PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    await Task.updateOne({
        _id: id,
        deleted: false
    }, {
        ...req.body
    })
    res.json({
        code: 200,
        message: "Cập nhật task thành công"
    })
};

//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response): Promise<void> => {
    const { ids, status } = req.body;
    await Task.updateMany({
        _id: { $in: ids },
        deleted: false
    }, {
        ...req.body
    })
    res.json({
        code: 200,
        message: "Cập nhật trạng thái task thành công"
    })
};

//[PATCH] /api/v1/tasks/delete-one/:id
export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    await Task.updateOne({
        _id: id,
        deleted: false
    }, {
        deleted: true
    })
    res.json({
        code: 200,
        message: "Xóa task thành công"
    })
};
