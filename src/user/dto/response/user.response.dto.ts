import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ default: 'Krasava', description: 'name', required: false }) // дає швагеру знати що є в юзеру,
  // в налаштуваннях вказати чи обовязкове воно чи є щось в дескріпшенах.
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
