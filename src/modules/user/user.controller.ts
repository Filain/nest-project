import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  // ApiConflictResponse,
  // ApiCreatedResponse,
  // ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserService } from './user.service';

@ApiTags('User') // Згрупувало теги в швагері
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiCreatedResponse({type:UserResponseDto}) // Після того як ми створимо повернеться відповідь
  // // в  параметрах вказуємо тип моделі яка вертається
  // @ApiForbiddenResponse({description:'Forbidden'})
  // @ApiConflictResponse({description:'Conflict'})

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Get()
  public async findAll(): Promise<string> {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<string> {
    return await this.userService.remove(+id);
  }
}
