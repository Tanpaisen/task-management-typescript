import { Router } from 'express';
import * as controller from '../controllers/task.controller';

export const routerTask: Router = Router()

routerTask.get('/', controller.index);

routerTask.get('/detail/:id', controller.detail);

routerTask.patch('/change-status/:id', controller.changeStatus);

routerTask.patch('/edit/:id', controller.edit);

routerTask.patch('/delete-one/:id', controller.deleteOne);

routerTask.post('/create', controller.create);

routerTask.patch('/change-multi', controller.changeMulti);


