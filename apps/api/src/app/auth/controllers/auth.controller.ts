import { AuthService } from './../services/auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserDto } from '../../users/dto/users.dto';
import { RefreshTokensDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(@Body() userDto: UserDto) {
    await this.authService.registerUser(userDto);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() userDto: UserDto) {
    return this.authService.loginUser(userDto);
  }

  @HttpCode(200)
  @Post('refresh')
  refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
    return this.authService.refreshUserTokens(refreshTokensDto.refreshToken);
  }
}
