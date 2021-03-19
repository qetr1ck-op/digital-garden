import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsRepository } from './repositories/posts.repository';
import { PostSchema, PostEntityName } from './entities/post.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntityName, schema: PostSchema }]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
