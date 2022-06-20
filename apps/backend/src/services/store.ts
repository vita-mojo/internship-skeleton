import { Store } from '../data/models/store';
import { connection } from '../main';

export const getAllStores = async (page: string) => {
  try {
    const pageNum = parseInt(page);

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

    return storeAndItsMenus;
  } catch (err) {
    return err;
  }
};
