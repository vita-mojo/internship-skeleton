import { Store } from '../data/models/store';
import { connection } from '../main';

export const getStores = async (
  page: string,
  deliveryType: any,
  storeName: any
) => {
  try {
    const pageNum = parseInt(page);
    const itemsPerPage = 10;
    let storeAndItsMenus = {};

    const allStores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .getCount();

    const stores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .skip((pageNum - 1) * itemsPerPage)
      .take(10)
      .getMany();

    const querySearchMenusByDeliveryType = connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .leftJoinAndSelect(
        'store.menus',
        'storesByName',
        'storesByName.channel = :channel',
        { channel: deliveryType }
      );

    const querySearchStoreByNameAndDeliveryType = connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .leftJoinAndSelect(
        'store.menus',
        'storesByName',
        'storesByName.channel = :channel',
        { channel: deliveryType }
      )
      .where('store.name LIKE :name', { name: `%${storeName}%` });

    const querySearchStoreByName = connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.menus', 'storesByName')
      .where('store.name LIKE :name', { name: `%${storeName}%` });

    if (storeName) {
      if (deliveryType) {
        console.log('delivery type');
        const allStoresByNameAndDeliveryType =
          await querySearchStoreByNameAndDeliveryType.getCount();
        const storesPerPageByNameAndDeliveryType =
          await querySearchStoreByNameAndDeliveryType
            .skip((pageNum - 1) * itemsPerPage)
            .take(10)
            .getMany();
        const numOfPages = Math.ceil(
          allStoresByNameAndDeliveryType / itemsPerPage
        );

        storeAndItsMenus = storesPerPageByNameAndDeliveryType;

        return {
          storeAndItsMenus,
          numOfPages
        };
      }
      if (!deliveryType) {
        const allStoresByNameAndDeliveryType =
          await querySearchStoreByNameAndDeliveryType.getCount();
        const storesPerPageByNameAndDeliveryType = await querySearchStoreByName
          .skip((pageNum - 1) * itemsPerPage)
          .take(10)
          .getMany();
        const numOfPages = Math.ceil(
          allStoresByNameAndDeliveryType / itemsPerPage
        );

        storeAndItsMenus = storesPerPageByNameAndDeliveryType;
        return {
          storeAndItsMenus,
          numOfPages
        };
      }
    }

    if (deliveryType) {
      const allStoresandMenusByDeliveryType =
        await querySearchMenusByDeliveryType.getCount();
      const storesAndMenusPerPageByDeliveryType =
        await querySearchMenusByDeliveryType
          .skip((pageNum - 1) * itemsPerPage)
          .take(10)
          .getMany();
      const numOfPages = Math.ceil(
        allStoresandMenusByDeliveryType / itemsPerPage
      );
      storeAndItsMenus = storesAndMenusPerPageByDeliveryType;
      return {
        storeAndItsMenus,
        numOfPages
      };
    }

    storeAndItsMenus = await Promise.all(
      stores.map(async (item) => {
        return await connection
          .getRepository(Store)
          .createQueryBuilder('store')
          .leftJoinAndSelect('store.menus', 'menus')
          .where('store.id = :id', { id: item.id })
          .getOne();
      })
    );

    const numOfPages = Math.ceil(allStores / itemsPerPage);

    return { storeAndItsMenus, numOfPages };
  } catch (err) {
    return err;
  }
};
