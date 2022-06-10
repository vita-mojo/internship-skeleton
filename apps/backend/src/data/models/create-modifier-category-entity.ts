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
  minSelection: number;

  @Column({ type: 'int' })
  maxSelection: number;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Product, (product: Product) => product.modifier_categories)
  product: Product;

  @OneToMany(
    () => Modifiers,
    (modifier: Modifiers) => modifier.modifier_category
  )
  modifiers: Modifiers[];
}
