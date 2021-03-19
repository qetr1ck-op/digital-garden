import { UserDocument } from './../entities/user.entity';
import { UserRepository } from './../repositories/user.repository';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto, UpdateUserDto } from '../dto/users.dto';
import {
  DB_ERROR_CODES,
  errorCodes,
} from '../../shared/constants/db-errors.const';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    @Inject(DB_ERROR_CODES) private dbErrorCodes: typeof errorCodes
  ) {}

  async create(userDto: UserDto) {
    try {
      return this.userRepository.create(userDto);
    } catch (error) {
      if (error.code === this.dbErrorCodes.duplicatedValue) {
        throw new HttpException(
          `Email ${userDto.email} already exist`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { nModified } = await this.userRepository.update(id, updateUserDto);

    if (!nModified) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.userRepository.remove(id);

    if (!deletedCount) {
      throw new NotFoundException();
    }
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const { nModified } = await this.userRepository.updateRefreshToken(
      id,
      refreshToken
    );

    if (!nModified) {
      throw new NotFoundException();
    }
  }
}
