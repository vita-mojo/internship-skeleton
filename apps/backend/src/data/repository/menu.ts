import { EntityRepository, Repository } from 'typeorm';

import { Menu } from '../models/menu';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
