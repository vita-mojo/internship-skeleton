import { EntityRepository, Repository } from 'typeorm';

import { Store } from '../models/create-store-entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {}
