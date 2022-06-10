import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Menu } from './create-menu-entity';

@Entity({ name: 'store' })
export class Store {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', length: 1000 })
  description: string;

  @Column({ type: 'json' })
  geo: { lat: string; long: string; adress: string };

  @OneToMany(() => Menu, (menu) => menu.id)
  menu: Menu[];
}
