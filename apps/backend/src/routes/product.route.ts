import { Router } from 'express';

import controller from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/product/:id', controller.getProductById);
productRouter.get('/menu/products/:id/:page', controller.getProducts);

export default productRouter;