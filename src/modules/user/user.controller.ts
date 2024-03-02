import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  // ApiConflictResponse,
  // ApiCreatedResponse,
  // ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateUserRequestDto } from './models/dto/request/update-user.request.dto';
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
  public async findMy(): Promise<string> {
    return await this.userService.findOne(12);
  }

  @ApiBearerAuth()
  @Put('me')
  public async update(
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<string> {
    return await this.userService.update(12, updateUserDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.findOne(+id);
  }
}
