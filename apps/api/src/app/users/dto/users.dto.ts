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

export class ResponseUserDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  email: string;

  @Expose()
  password: string;
}

export class ResponseUserWithRefreshTokenDto extends PartialType(
  ResponseUserDto
) {
  @Expose()
  refreshToken: string;
}
