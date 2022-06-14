import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './product';
import { Store } from './store';

export type channelType = 'DELIVERY' | 'PICK_UP' | 'EAT_IN';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'store_id' })
  storeId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', name: 'working_hours' })
  workingHours: { from: string; to: string };

  @Column({ type: 'enum', enum: ['DELIVERY', 'PICK_UP', 'EAT_IN'] })
  channel: channelType;

  @ManyToOne(() => Store, (store) => store.menus)
  store: Store;

  @OneToMany(() => Product, (product) => product.menu)
  products: Product[];
}
