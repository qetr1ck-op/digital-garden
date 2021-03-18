import { UpdateUserDto, UserDto } from './../dto/users.dto';
import { UserEntityName, UserDocument } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntityName) private userModel: Model<UserDocument>
  ) {}

  async create(userDto: UserDto): Promise<UserDocument> {
    const post = new this.userModel(userDto);

    return post.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({}).exec();
  }

  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, { ...updateUserDto }).exec();
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this.userModel.updateOne({ _id: id }, { refreshToken }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
