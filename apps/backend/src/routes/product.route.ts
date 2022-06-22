import { Router } from 'express';

import controller from '../controllers/product.controller';

const productRouter = Router();

//GET specific product by ID
productRouter.get('/product/:productId', controller.getProductById);
//GET all products from a specific menu by menuId
productRouter.get('/menu/products/:menuId', controller.getProducts);

export default productRouter;
