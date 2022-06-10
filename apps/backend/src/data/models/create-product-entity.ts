import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Menu } from './create-menu-entity';
import { ModifierCategory } from './create-modifier-category-entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column({ type: 'text', length: 1000 })
  image: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', length: 1000 })
  description: string;

  @Column({ type: 'json' })
  metadata: { diatary: string; ingredients: string; nutrition: string };

  @Column({ type: 'int' })
  menu_id: number;

  @ManyToOne(() => Menu, (menu: Menu) => menu.products)
  menu: Menu;

  @OneToMany(
    () => ModifierCategory,
    (modifier_category: ModifierCategory) => modifier_category.product
  )
  modifier_categories: ModifierCategory[];
}
