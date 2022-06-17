import { Menu } from '../data/models/menu';
import { connection } from '../main';

const getMenus = async (params: string): Promise<Menu[] | null> => {
  try {
    const menus = await connection
      .getRepository(Menu)
      .createQueryBuilder('menu')
      .where('menu.storeId = :id', { id: params })
      .getMany();
    return menus;
  } catch (err) {
    throw Error('Menus not found');
  }
};

export default getMenus;
