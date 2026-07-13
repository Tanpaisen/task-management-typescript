import { Express } from 'express'
import { routerTask } from './task.route'
import { routerUser } from './user.route'

export const routeMainv1 = (app: Express) => {
    app.use('/api/v1/tasks', routerTask)

    app.use('/api/v1/users', routerUser)
}