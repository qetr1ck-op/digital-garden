import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class UserResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  email: string;
}
