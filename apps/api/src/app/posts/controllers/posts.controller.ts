import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UseAuthGuard } from '../../auth/guards/auth.guard';
import { UseResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { MongoObjectIdPipe } from '../../shared/pipes/mongo-object-id.pipe';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from '../dto/post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
@UseAuthGuard()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseResponseInterceptor(PostResponseDto)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseResponseInterceptor(PostResponseDto)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', MongoObjectIdPipe) id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoObjectIdPipe) id: string) {
    return this.postsService.remove(id);
  }
}
