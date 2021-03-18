import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { PostDocument } from '../entities/post.entity';
import { ResponsePostDto } from '../dto/response-post.dto';

@Injectable()
export class PostsSerializer {
  idOnly(post: PostDocument): { id: string } {
    return { id: post._id };
  }

  one(post: PostDocument): ResponsePostDto {
    return plainToClass(ResponsePostDto, post, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  all(post: PostDocument[]): ResponsePostDto[] {
    return plainToClass(ResponsePostDto, post, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }
}
