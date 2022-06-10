import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './create-product-entity';
import { Store } from './create-store-entity';

export type channelType = 'DELIVERY' | 'PICK_UP' | 'EAT_IN';

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  store_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', length: 2000 })
  description: string;

  @Column({ type: 'json' })
  working_hours: { from: string; to: string };

  @Column({
    type: 'enum',
    enum: ['DELIVERY', 'PICK_UP', 'EAT_IN'],
    default: 'EAT_IN'
  })
  channel: channelType;

  @ManyToOne(() => Store, (store: Store) => store.store_id)
  store: Store;

  @OneToMany(() => Product, (product: Product) => product.id)
  products: Product[];
}
