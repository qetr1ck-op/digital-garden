import { MongoObjectIdPipe } from './../shared/pipes/mongo-object-id.pipe';
import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UpdateUserDto, UserResponseDto } from './dto/users.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseResponse } from '../shared/interceptors/response.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseResponse(UserResponseDto)
  getById(@Param('id', MongoObjectIdPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseResponse(UserResponseDto)
  getByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', MongoObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
