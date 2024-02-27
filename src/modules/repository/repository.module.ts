import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article.repository';
import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  //мусимо додавати сюди кастомний репозиторій
  UserRepository,
  ArticleRepository,
  TagRepository,
  RefreshTokenRepository,
  LikeRepository,
  CommentRepository,
  FollowRepository,
];

@Global() // модуль який імпортує без імпортів все що є в провайдерах
@Module({
  imports: [],
  controllers: [],
  providers: [...repositories], // підключаються в наші репозиторії
  exports: [...repositories], // щоб використовувати їх зовні
})
export class RepositoryModule {}
