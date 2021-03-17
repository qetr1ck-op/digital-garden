import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { PostDocument, PostEntity } from "../entities/post.entity";

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(PostEntity.name) private postModel: Model<PostDocument>) {}

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
    return this.postModel.updateOne({_id: id}, {...updatePostDto}).exec();
  }

  remove(id: string) {
    return this.postModel.deleteOne({_id: id}).exec();
  }
}
