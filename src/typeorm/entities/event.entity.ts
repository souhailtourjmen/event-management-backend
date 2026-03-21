import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Client } from './client.entity';

@Entity()
export class Event {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  date!: Date;

  @Column()
  location!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Client, (client) => client.events, {
    cascade: true,
  })
  @JoinTable()
  clients!: Client[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
