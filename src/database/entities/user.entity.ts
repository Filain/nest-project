import { Column, Entity } from 'typeorm';

import { BaseEntity } from './models/base.entity';

@Entity('users') //це ентіті сутність бази
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true }) // колонки нашої бази
  name?: string;

  @Column('text') // колонки нашої бази
  email: string;

  @Column('text', { select: false }) // колонки нашої бази
  password: string;

  @Column('int', { nullable: true }) // колонки нашої бази
  age: number;
}
