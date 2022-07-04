import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Menu } from './menu';
import { ModifierCategory } from './modifierCategory';

interface Nutrition {
  fats?: number | null;
  salt?: number | null;
  carbs?: number | null;
  fibre?: number | null;
  calories?: number | null;
  tenAday?: number | null;
  proteins?: number | null;
  carbsSugar?: number | null;
  fatSaturates?: number | null;
  defaultQuantity?: number | null;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json' })
  metadata: { dietary?: string; ingredients: string; nutrition: Nutrition };

  @Column({ type: 'int', name: 'menu_id' })
  menuId: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => Menu, (menu: Menu) => menu.products)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;

  @OneToMany(
    () => ModifierCategory,
    (modifierCategory: ModifierCategory) => modifierCategory.product
  )
  modifierCategories: ModifierCategory[];
}
