import { PickType } from '@nestjs/swagger';

import { BaseAuthRequestDto } from './base-auth.request.dto';

export class SignInRequestDto extends PickType(BaseAuthRequestDto, [
  // PickType використовує декоратири з AuthBaseRequestDto
  'deviceId',
  'email',
  'password',
]) {}
