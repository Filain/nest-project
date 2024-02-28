import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { Config, PostgresConfig, RedisConfig } from '../../configs/config.type';
import { RedisService } from './redis.service';

const redisProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: (configService: ConfigService<Config>) => {
    const redisConfig = configService.get<RedisConfig>('redis');

    return new Redis({
      // наш інстанс який ми ретьорнимо - є провайдером
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService], // наша useFactory приймає те що описано в нашому inject: [ConfigService]
};

@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
})
export class RedisModule {}
