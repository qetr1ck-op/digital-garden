import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsRepository } from './repositories/posts.repository';
import { PostSchema, PostEntityName } from './entities/post.entity';
import { PostsSerializer } from './services/posts.serializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntityName, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostsSerializer],
})
export class PostsModule {}
