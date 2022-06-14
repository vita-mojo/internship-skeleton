import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Menu } from '../models/menu';
import { ModifierCategory } from '../models/modifierCategory';
import { Modifiers } from '../models/modifiers';
import { Product } from '../models/product';
import { Store } from '../models/store';
import menuData from './menus.json';
import modifierData from './modifiers.json';
import modifiersCategoryData from './modifiersCategory.json';
import productData from './products.json';
import storeData from './stores.json';

export default class CreateStores implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values(storeData)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Menu)
      .values(menuData)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(productData)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(ModifierCategory)
      .values(modifiersCategoryData)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Modifiers)
      .values(modifierData)
      .execute();
  }
}
