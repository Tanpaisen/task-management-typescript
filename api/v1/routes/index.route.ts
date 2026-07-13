import { Express } from 'express'
import { routerTask } from './task.route'
import { routerUser } from './user.route'
import { auth } from '../../../middleware/auth.middleware';

export const routeMainv1 = (app: Express) => {
    app.use('/api/v1/tasks', auth, routerTask)

    app.use('/api/v1/users', routerUser)
}