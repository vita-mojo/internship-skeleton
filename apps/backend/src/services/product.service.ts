import { Product } from '../data/models/product';
import { connection } from '../main';

const getAllProducts = async (
  menuId: string,
  page: number,
  searchByName: string,
  sort,
  min_price: number,
  max_price: number
) => {
  try {
    const perPage = 12;

    const builder = connection
      .getRepository(Product)
      .createQueryBuilder('product');

    const price = connection
      .getRepository(Product)
      .createQueryBuilder('product');

    let products;

    if (page) {
      products = await builder.where('product.menuId = :menuId', { menuId });
    }

    //returns products that have a price between min_price and max_price
    if (min_price || max_price) {
      products = await builder.where(
        `product.menuId = :menuId AND product.price >= ${min_price} AND product.price <= ${max_price}`,
        { menuId }
      );
    }

    //return the products which name containe searching string
    if (searchByName) {
      products = await builder.where(
        'product.menuId = :menuId AND product.name LIKE :searchByName',
        {
          menuId,
          searchByName: `%${searchByName}%`
        }
      );
    }

    //take only 12 products per page
    products = await products
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany();

    if (sort) {
      const categorySort = sort.split('_')[0];
      const sortType = sort.split('_')[1];
      switch (categorySort) {
        case 'price':
          products = await builder
            .orderBy({ 'product.price': sortType.toUpperCase() })
            .getMany();
          break;
        case 'name':
          products = await builder
            .orderBy({ 'product.name': sortType.toUpperCase() })
            .getMany();
          break;
        case 'calories':
          products = await builder
            .orderBy({
              'product.metadata->"$.nutrition.calories"': sortType.toUpperCase()
            })
            .getMany();
          break;
        default:
          console.log('Can not sort');
      }
    }

    //This constants return number of products from a menu
    const totalProducts = await builder.getCount();

    const maxPrice = await price
      .select('MAX(product.price)', 'max')
      .where('product.menuId = :menuId', { menuId })
      .getRawOne();

    const minPrice = await price
      .select('MIN(product.price)', 'min')
      .where('product.menuId = :menuId', { menuId })
      .getRawOne();

    return {
      data: products,
      totalProducts,
      maxPrice: parseFloat(maxPrice.max.toFixed(2)),
      minPrice: parseFloat(minPrice.min.toFixed(2)),
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
