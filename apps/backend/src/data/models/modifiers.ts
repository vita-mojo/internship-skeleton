import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ModifierCategory } from './modifierCategory';

@Entity()
export class Modifier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  modifier_cateogory_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean' })
  is_default: boolean;

  @Column({ type: 'json' })
  metadata: { energy: string; protein: string; fiber: string };

  @ManyToOne(
    () => ModifierCategory,
    (modifierCategory) => modifierCategory.modifiers
  )
  modifierCategory: ModifierCategory;
}
