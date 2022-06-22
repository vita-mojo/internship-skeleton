import { Request, Response } from 'express';

import service from '../services/product.service';

const getProducts = async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const page: number = parseInt(req.query.page as string) || 1;
  try {
    const products = await service.getAllProducts(menuId, page);
    return res.json(products);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await service.getOneProductById(productId);
    return res.json({
      data: product
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default { getProducts, getProductById };
