import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './create-product-entity';
import { Modifiers } from './create-modifiers-entity';

@Entity()
export class ModifierCategory {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  min_selection: number;

  @Column({ type: 'int' })
  max_selection: number;

  @Column({ type: 'int' })
  product_id: number;

  @ManyToOne(() => Product, (product: Product) => product.modifierCategories)
  product: Product;

  @OneToMany(
    () => Modifiers,
    (modifier: Modifiers) => modifier.modifierCategory
  )
  modifiers: Modifiers[];
}
