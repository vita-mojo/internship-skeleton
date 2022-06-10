import { EntityRepository, Repository } from 'typeorm';

import { ModifierCategory } from '../models/modifierCategory';

@EntityRepository(ModifierCategory)
export class ModifierCategoryRepository extends Repository<ModifierCategory> {}
