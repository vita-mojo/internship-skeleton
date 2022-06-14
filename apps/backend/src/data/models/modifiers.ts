import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { ModifierCategory } from './modifierCategory';

@Entity()
export class Modifiers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'modifier_category_id' })
  modifierCategoryId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean', name: 'is_default' })
  isDefault: boolean;

  @Column({ type: 'json', default: '{}' })
  metadata: { energy: string; protein: string; fiber: string };

  @ManyToOne(
    () => ModifierCategory,
    (modifierCategory) => modifierCategory.modifiers
  )
  @JoinColumn({ name: 'modifier_category_id', referencedColumnName: 'id' })
  modifierCategory: ModifierCategory;
}
