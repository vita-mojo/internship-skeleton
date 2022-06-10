import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Menu } from './menu';
import { ModifierCategory } from './modifierCategory';

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

  @Column({ type: 'int', name: 'menu_id' })
  menuId: number;

  @ManyToOne(() => Menu, (menu: Menu) => menu.products)
  menu: Menu;

  @OneToMany(
    () => ModifierCategory,
    (modifierCategory: ModifierCategory) => modifierCategory.product
  )
  modifierCategories: ModifierCategory[];
}