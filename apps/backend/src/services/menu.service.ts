import { Menu } from '../data/models/menu';
import { connection } from '../main';

const getMenus = async (
  params: string,
  page: string
): Promise<Menu[] | null> => {
  try {
    const menus = await connection
      .getRepository(Menu)
      .createQueryBuilder('menu')
      .where('menu.storeId = :id', { id: params })
      .skip((~~page - 1) * 2)
      .take(2)
      .getMany();
    return menus;
  } catch (err) {
    throw Error('Menus not found');
  }
};

export default getMenus;
