import {
  ResponseUserDto,
  ResponseUserWithRefreshTokenDto,
} from './../dto/users.dto';
import { UserDocument } from './../entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSerializer {
  idOnly(user: UserDocument): { id: string } {
    return { id: user._id };
  }

  one(user: UserDocument) {
    return plainToClass(ResponseUserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  oneWithRefreshToken(user: UserDocument) {
    return plainToClass(ResponseUserWithRefreshTokenDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  all(users: UserDocument[]) {
    return plainToClass(ResponseUserDto, users, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }
}
