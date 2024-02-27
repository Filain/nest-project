import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  // тут наш конекшн
  constructor(private readonly dataSourse: DataSource) {
    super(UserEntity, dataSourse.manager);
  }
  // тут всьо пишеться
  public async foo() {
    return await this.find();
  }
}
