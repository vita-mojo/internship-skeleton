import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ModifierCategory } from './create-modifier-category-entity';

@Entity()
export class Modifier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  modifierCateogoryId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean' })
  isDefault: boolean;

  @Column({ type: 'json' })
  metadata: { energy: string; protein: string; fiber: string };

  @ManyToOne(
    () => ModifierCategory,
    (modifierCategory) => modifierCategory.modifiers
  )
  modifierCategory: ModifierCategory;
}
