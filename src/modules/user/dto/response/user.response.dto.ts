// import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  id: string;
  // @ApiProperty({ default: 'Krasava', description: 'name', required: false }) // дає швагеру знати що є в юзеру,
  // // в налаштуваннях вказати чи обовязкове воно чи є щось в дескріпшенах.
  name?: string;
  age: number;
  email: string;
  password: string;
}
