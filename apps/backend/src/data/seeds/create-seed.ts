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

export default class CreateSeeds implements Seeder {
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
      .values(
        (productData as []).map((product) =>
          Object.assign(product, {
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
          })
        )
      )
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(ModifierCategory)
      .values(modifiersCategoryData)
      .execute();

    while ((modifierData as []).length) {
      console.log((modifierData as []).length);
      await connection
        .createQueryBuilder()
        .insert()
        .into(Modifiers)
        .values(
          (modifierData as [])
            .splice(0, 10000)
            .map((modifier) => Object.assign(modifier, { metadata: '{}' }))
        )
        .execute();
    }
  }
}
