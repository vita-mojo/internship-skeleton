import { EntityRepository, Repository } from 'typeorm';

import { Modifier } from '../models/modifiers';

@EntityRepository(Modifier)
export class ModifiersRepository extends Repository<Modifier> {}
