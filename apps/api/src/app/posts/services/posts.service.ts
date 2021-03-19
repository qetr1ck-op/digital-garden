import { PostDocument } from './../entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    return this.postRepository.create(createPostDto);
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postRepository.findAll();
  }

  async findOne(id: string): Promise<PostDocument> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto
  ): Promise<{ id: string }> {
    const { nModified } = await this.postRepository.update(id, updatePostDto);

    if (!nModified) {
      throw new NotFoundException();
    }

    return { id };
  }

  async remove(id: string): Promise<{ id: string }> {
    const { deletedCount } = await this.postRepository.remove(id);

    if (!deletedCount) {
      throw new NotFoundException();
    }

    return { id };
  }
}
