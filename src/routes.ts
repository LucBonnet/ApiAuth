import { Router } from 'express';

const authMiddleware = require("./middlewares/auth");

import UsersController from './controllers/UsersController';

const routes = Router();

routes.get('/users', UsersController.index);
routes.post('/register', UsersController.create);
routes.post('/signin', UsersController.show);
routes.use(authMiddleware);
routes.get('/profile/:id', UsersController.index);

export default routes;