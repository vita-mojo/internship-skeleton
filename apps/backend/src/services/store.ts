import { Store } from '../data/models/store';
import { connection } from '../main';

export const getAllStores = async (param: string) => {
  try {
    const toNumber = parseInt(param);
    const stores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .skip((toNumber - 1) * 10)
      .take(10)
      .getMany();
    return stores;
  } catch (err) {
    return err;
  }
}; // each get request will return 10 items per page. Content of items will be manipulated by req.params
