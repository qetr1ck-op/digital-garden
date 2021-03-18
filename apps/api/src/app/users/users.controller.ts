import { MongoObjectIdPipe } from './../shared/pipes/mongo-object-id.pipe';
import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UpdateUserDto } from './dto/users.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  @UseGuards(AuthGuard)
  getAll(@Param('email') email: string) {
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
