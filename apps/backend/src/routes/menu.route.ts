import { Router } from 'express';

import controller from '../controllers/menu.controller';

const menuRouter = Router();
menuRouter.get('/menu/:id', controller.getMenu);

export default menuRouter;
