import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseEntity } from './models/base.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ARTICLES)
export class ArticleEntity extends BaseEntity {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column()
  user_id: string; // назва нашої колонки відповідає за релейшн з (user?: UserEntity) цією сутністю
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' }) // орписуємо що колонка user_id: є звязуючою
  user?: UserEntity; // даний звязок має бути описаний з іншої сторони в user.entity

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments?: CommentEntity[];

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  @JoinTable()
  tags?: TagEntity[];
}
