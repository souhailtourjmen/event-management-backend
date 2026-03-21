import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Event } from './event.entity';

@Entity()
export class Client {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Event, (event) => event.clients)
  events!: Event[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
