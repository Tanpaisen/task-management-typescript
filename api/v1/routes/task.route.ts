import { Router } from 'express';
import * as controller from '../controllers/task.controller';

export const routerTask: Router = Router()

routerTask.get('/', controller.index);

routerTask.get('/detail/:id', controller.detail);

routerTask.patch('/change-status/:id', controller.changeStatus);
