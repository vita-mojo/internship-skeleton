import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ModifierCategory } from './create-modifier-category-entity';

@Entity({ name: 'modifiers' })
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
    (modifier_category: ModifierCategory) =>
      modifier_category.modifier_cateogory_id
  )
  modifier_category: ModifierCategory;
}
