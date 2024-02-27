import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}

@Entity(TableNameEnum.TAGS)
export class TagEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
