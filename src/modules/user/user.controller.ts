import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response/user.response.dto';

@ApiTags('user') // Згрупувало теги в швагері
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiCreatedResponse({type:UserResponseDto}) // Після того як ми створимо повернеться відповідь
  // // в  параметрах вказуємо тип моделі яка вертається
  // @ApiForbiddenResponse({description:'Forbidden'})
  // @ApiConflictResponse({description:'Conflict'})
  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.userService.create(createUserDto) as any;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
