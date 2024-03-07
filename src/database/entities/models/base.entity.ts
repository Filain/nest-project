import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid') //первинний ключ (Primary Key) із автоматично генерованим значенням унікального ідентифікатора типу UUID.
  id: string;

  @CreateDateColumn() //він наказує TypeORM автоматично встановлювати значення цієї властивості на поточну позначку часу, коли новий запис вставляється в базу даних.
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
