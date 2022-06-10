import { EntityRepository, Repository } from 'typeorm';

import { Modifier } from '../models/create-modifiers-entity';

@EntityRepository(Modifier)
export class ModifierRepository extends Repository<Modifier> {}
