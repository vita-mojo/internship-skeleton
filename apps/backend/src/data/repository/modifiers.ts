import { EntityRepository, Repository } from 'typeorm';

import { Modifiers } from '../models/modifiers';

@EntityRepository(Modifiers)
export class ModifiersRepository extends Repository<Modifiers> {}
