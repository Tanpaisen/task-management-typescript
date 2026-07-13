import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { auth } from '../../../middleware/auth.middleware';

export const routerUser: Router = Router()

routerUser.post('/register', controller.register);

routerUser.post('/login', controller.login);

routerUser.get('/info', auth, controller.info);
