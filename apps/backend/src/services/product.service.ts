import { Product } from '../data/models/product';
import { connection } from '../main';

const getAllProducts = async (menuId: string, page: number) => {
  try {
    const perPage = 12;

    const builder = connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.menuId = :menuId', { menuId });

    const products = await builder
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany();

    const totalProducts = await builder.getCount();

    return {
      data: products,
      totalProducts,
      page,
      howManyPages: Math.ceil(totalProducts / perPage)
    };
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