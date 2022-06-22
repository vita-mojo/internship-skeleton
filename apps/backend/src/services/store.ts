import { Store } from '../data/models/store';
import { connection } from '../main';

export const getStores = async (page: string) => {
  try {
    const pageNum = parseInt(page);

    const allStores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .getCount();

    console.log(allStores);

    const stores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .skip((pageNum - 1) * 10)
      .take(10)
      .getMany();

    const storeAndItsMenus = await Promise.all(
      stores.map(async (item) => {
        return await connection
          .getRepository(Store)
          .createQueryBuilder('store')
          .leftJoinAndSelect('store.menus', 'menus')
          .where('store.id = :id', { id: item.id })
          .getOne();
      })
    );

    return { storeAndItsMenus, allStores };
  } catch (err) {
    return err;
  }
};
