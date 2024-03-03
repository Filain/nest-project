import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  // ApiConflictResponse,
  // ApiCreatedResponse,
  // ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateUserRequestDto } from './models/dto/request/update-user.request.dto';
import { UserResponseDto } from './models/dto/response/user.response.dto';
import { UserService } from './services/user.service';

// @ApiTags('User') // Згрупувало теги в швагері
// @Controller('user') // Наш роут головний
// export class UserController {
//   constructor(private readonly userService: UserService) {}

// @ApiCreatedResponse({type:UserResponseDto}) // Після того як ми створимо повернеться відповідь
// // в  параметрах вказуємо тип моделі яка вертається
// @ApiForbiddenResponse({description:'Forbidden'})
// @ApiConflictResponse({description:'Conflict'})
// @SkipAuth()
// @Post()
// public async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
//   // @Body() -декоратор який витягає тіло нашого запиту
//   return await this.userService.create(dto);
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.findMe(userData);
  }

  @ApiBearerAuth()
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @SkipAuth()
  @Get(':id')
  public async getPublicUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getPublicUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.userService.follow(userId, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.userService.unfollow(userId, userData);
  }
}
