import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Modifiers } from './modifiers';
import { Product } from './product';

@Entity({ name: 'modifier-category' })
export class ModifierCategory {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', name: 'min_selection' })
  minSelection: number;

  @Column({ type: 'int', name: 'max_selection' })
  maxSelection: number;

  @Column({ type: 'int', name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product: Product) => product.modifierCategories)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @OneToMany(
    () => Modifiers,
    (modifier: Modifiers) => modifier.modifierCategory
  )
  modifiers: Modifiers[];
}
