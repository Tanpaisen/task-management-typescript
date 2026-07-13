import { Router } from 'express';
import * as controller from '../controllers/user.controller';

export const routerUser: Router = Router()

routerUser.post('/register', controller.register);
