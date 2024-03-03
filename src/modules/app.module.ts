import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgress/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    HealthModule,
    RepositoryModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
