import { PostsSerializer } from './services/posts.serializer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PostsRepository } from './repositories/posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponsePostDto } from './dto/response-post.dto';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository, private postSerializer: PostsSerializer) {}

  async create(createPostDto: CreatePostDto): Promise<{id: string}> {
    const post = await this.postRepository.create(createPostDto)

    return this.postSerializer.idOnly(post)
  }

  async findAll(): Promise<ResponsePostDto[]> {
    const posts = await this.postRepository.findAll()

    return this.postSerializer.all(posts)
  }

  async findOne(id: string): Promise<ResponsePostDto> {
    const post = await this.postRepository.findOne(id)

    return this.postSerializer.one(post)
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<{id: string}> {
    const {nModified} = await this.postRepository.update(id, updatePostDto)

    if (!nModified) {
      throw new NotFoundException()
    }

    return {id}
  }

  async remove(id: string): Promise<{id: string}> {
    const {deletedCount} = await this.postRepository.remove(id)

    if (!deletedCount) {
      throw new NotFoundException()
    }

    return {id}
  }
}