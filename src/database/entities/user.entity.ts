import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users') //це ентіті сутність бази
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true }) // колонки нашої бази
  name?: string;

  @Column('text') // колонки нашої бази
  email: string;

  @Column('text', { select: false }) // колонки нашої бази
  password: string;

  @Column('int', { nullable: true }) // колонки нашої бази
  bio?: number; // треба ставити знак питаннгя в типізації щоб потім допомагало

  @Column('int', { nullable: true }) // колонки нашої бази
  image?: string;

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following)
  followings?: FollowEntity[];
}
