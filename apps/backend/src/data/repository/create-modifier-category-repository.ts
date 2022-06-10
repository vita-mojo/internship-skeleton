import { EntityRepository, Repository } from 'typeorm';

import { ModifierCategory } from '../models/create-modifier-category-entity';

@EntityRepository(ModifierCategory)
export class ModifierCategoryRepository extends Repository<ModifierCategory> {}
