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
    let builder = connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.menuId = :menuId', { menuId });

    //return the products which name containe searching string
    if (searchByName) {
      builder = builder.andWhere('product.name LIKE :searchByName', {
        searchByName: `%${searchByName}%`
      });
    }

    //returns products that have a price between min_price and max_price
    if (min_price || max_price) {
      builder = builder.andWhere(
        `product.price >= ${min_price} AND product.price <= ${max_price} + 0.001`
      );
    }

    if (sort) {
      const categorySort = sort.split('_')[0];
      const sortType = sort.split('_')[1];

      switch (categorySort) {
        case 'price':
          builder = builder.orderBy({
            'product.price': sortType.toUpperCase()
          });
          break;
        case 'name':
          builder = builder.orderBy({ 'product.name': sortType.toUpperCase() });
          break;
        case 'calories':
          builder = builder.orderBy({
            'product.metadata->"$.nutrition.calories"': sortType.toUpperCase()
          });
          break;
        default:
          console.log('Can not sort');
      }
    }

    //take only 12 products per page
    const [products, count] = await builder
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    const { minPrice, maxPrice, minCalory, maxCalory } = await connection
      .getRepository(Product)
      .createQueryBuilder('product')
      .select([
        'MIN(product.price) AS minPrice',
        'MAX(product.price) AS maxPrice',
        'MIN(product.metadata->"$.nutrition.calories") AS minCalory',
        'MAX(product.metadata->"$.nutrition.calories") AS maxCalory'
      ])
      .where('product.menuId = :menuId', { menuId })
      .getRawOne();

    return {
      data: products,
      totalProducts: count,
      maxPrice: parseFloat(maxPrice),
      minPrice: parseFloat(minPrice),
      minCalory: parseFloat(minCalory),
      maxCalory: parseFloat(maxCalory),
      page,
      howManyPages: Math.ceil(count / perPage)
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
