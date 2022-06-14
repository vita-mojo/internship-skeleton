import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Store } from '../models/store';
import storeData from './stores.json';

export default class CreateStores implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values(storeData)
      .execute();
  }
}
