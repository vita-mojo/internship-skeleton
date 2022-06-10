import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ModifierCategory } from './modifierCategory';

@Entity()
export class Modifiers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'working_hours' })
  modifierCateogoryId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean', name: 'is_default' })
  isDefault: boolean;

  @Column({ type: 'json' })
  metadata: { energy: string; protein: string; fiber: string };

  @ManyToOne(
    () => ModifierCategory,
    (modifierCategory) => modifierCategory.modifiers
  )
  modifierCategory: ModifierCategory;
}
