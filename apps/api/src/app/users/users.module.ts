import { AuthModule } from './../auth/auth.module';
import { UserSerializer } from './services/user.serializer';
import { UserEntityName, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntityName, schema: UserSchema }]),
    SharedModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService, UserSerializer],
  exports: [UsersService],
})
export class UsersModule {}
