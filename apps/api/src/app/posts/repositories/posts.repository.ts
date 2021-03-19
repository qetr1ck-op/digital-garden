import { PostEntityName } from './../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(PostEntityName) private postModel: Model<PostDocument>
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find({}).exec();
  }

  async findOne(id: string): Promise<PostDocument> {
    return this.postModel.findById(id).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({ _id: id }, { ...updatePostDto }).exec();
  }

  remove(id: string) {
    return this.postModel.deleteOne({ _id: id }).exec();
  }
}
