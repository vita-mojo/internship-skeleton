import { Product } from '../data/models/product';
import { connection } from '../main';

const getAllProducts = async (
  params: string,
  page: string
): Promise<Product[] | null> => {
  try {
    const products = await connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.menuId = :id', { id: params })
      .skip((~~page - 1) * 10)
      .take(10)
      .getMany();
    return products;
  } catch (err) {
    throw Error('Products not found');
  }
};

const getOneProductById = async (params: string): Promise<Product | null> => {
  try {
    const products = await connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.id = :id', { id: params })
      .getOne();
    return products;
  } catch (err) {
    throw Error('Products not found');
  }
};

export default { getAllProducts, getOneProductById };
