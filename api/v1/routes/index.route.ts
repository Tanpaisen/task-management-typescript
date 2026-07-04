import { Express } from 'express'
import { routerTask } from './task.route'

export const routeMainv1 = (app: Express) => {
    app.use('/api/v1/tasks', routerTask)
}