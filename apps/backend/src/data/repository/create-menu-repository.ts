import { EntityRepository, Repository } from 'typeorm';

import { Menu } from '../models/create-menu-entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
