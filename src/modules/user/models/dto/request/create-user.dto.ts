import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class CreateUserDto {
  // @ApiProperty({ default: 'Krasava', description: 'name', required: false }) // дає швагеру знати що є в юзеру,
  // в налаштуваннях вказати чи обовязкове воно чи є щось в дескріпшенах.

  @IsOptional()
  @IsString()
  @Length(3, 10)
  // @Transform(({ value }) => value.trim()) // - тут все трімиться забираються зайві пробіли
  @Transform(TransformHelper.trim())
  name: string;

  @IsInt()
  @Min(16)
  @Max(100)
  age: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/sdfsd/) // - наша регулярочка тримаємо в константах і затягуємо по потребі.
  password: string;

  @IsDate()
  @Type(() => Date) // - тут прийде string і ми перетворимо то в ню дату
  date: Date;
}
