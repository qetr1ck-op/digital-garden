import { UserDto } from './../../users/dto/users.dto';
import { JwtPayload, JwtTokens } from './../types/auth.types';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './../../users/services/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private moduleRef: ModuleRef
  ) {}

  private get usersService(): UsersService {
    return this.moduleRef.get(UsersService, { strict: false }); // avoiding circular decencies
  }

  private createHashedValue(userPassword: string): Promise<string> {
    return bcrypt.hash(
      userPassword,
      Number(this.configService.get('BCRYPT_SALT'))
    );
  }

  private async validateUserPasswords(
    hashedPassword: string,
    userPassword: string,
    errorMessage = 'Wrong credentials provided'
  ): Promise<void> {
    try {
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        userPassword
      );

      if (!isPasswordMatching) {
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private createJwtTokens({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): JwtTokens {
    const payload = { email, sub: id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
      )}`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}`,
    });

    return { accessToken, refreshToken };
  }

  private parseJwtToken(token: string, secret: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret,
    });
  }

  getTokenFromAuthHeader(authorizationHeader: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }
    return authorizationHeader.replace('Bearer ', '');
  }

  async registerUser(userDto: UserDto) {
    const hashedPassword = await this.createHashedValue(userDto.password);

    await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
  }

  private async getAuthenticatedUser(userDto: UserDto) {
    const user = await this.usersService.findByEmail(userDto.email);

    await this.validateUserPasswords(userDto.password, user.password);

    return user;
  }

  private async getAuthenticatedUserByRefreshToken(
    id: string,
    refreshToken: string
  ) {
    const user = await this.usersService.findById(id);

    await this.validateUserPasswords(refreshToken, user.refreshToken);

    return user;
  }

  async loginUser(userDto: UserDto) {
    const { id, email } = await this.getAuthenticatedUser(userDto);

    const tokens = this.createJwtTokens({ id, email });

    const hashedRefreshToken = await this.createHashedValue(
      tokens.refreshToken
    );

    await this.usersService.updateRefreshToken(id, hashedRefreshToken);

    return tokens;
  }

  async refreshUserTokens(refreshToken: string) {
    try {
      const jwtPayload = await this.parseJwtToken(
        refreshToken,
        this.configService.get('JWT_REFRESH_TOKEN_SECRET')
      );

      if (!jwtPayload) {
        throw new HttpException(
          'Invalid refresh token provided',
          HttpStatus.BAD_REQUEST
        );
      }

      const { id, email } = await this.getAuthenticatedUserByRefreshToken(
        jwtPayload.sub,
        refreshToken
      );

      const tokens = this.createJwtTokens({ id, email });

      const hashedRefreshToken = await this.createHashedValue(
        tokens.refreshToken
      );

      this.usersService.updateRefreshToken(id, hashedRefreshToken);

      return tokens;
    } catch {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync<{
        email: string;
        sub: string;
      }>(accessToken, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });

      return true;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
