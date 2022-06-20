import { Product } from '../data/models/product';
import { connection } from '../main';

const getAllProducts = async (
  menuId: string,
  page: string
): Promise<Product[] | null> => {
  try {
    const products = await connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.menuId = :menuId', { menuId })
      .skip((~~page - 1) * 10)
      .take(10)
      .getMany();
    return products;
  } catch (err) {
    throw Error('Products not found');
  }
};

const getOneProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const products = await connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.id = :productId', { productId })
      .getOne();
    return products;
  } catch (err) {
    throw Error('Products not found');
  }
};

export default { getAllProducts, getOneProductById };
