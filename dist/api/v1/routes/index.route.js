"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMainv1 = void 0;
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const routeMainv1 = (app) => {
    app.use('/api/v1/tasks', auth_middleware_1.auth, task_route_1.routerTask);
    app.use('/api/v1/users', user_route_1.routerUser);
};
exports.routeMainv1 = routeMainv1;
