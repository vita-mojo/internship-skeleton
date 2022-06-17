import { Request, Response } from 'express';

import service from '../services/product.service';

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await service.getAllProducts(req.params.id);
    return res.json({
      data: products
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await service.getOneProductById(req.params.id);
    return res.json({
      data: product
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default { getProducts, getProductById };
