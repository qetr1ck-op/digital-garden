import { DbModule } from './db/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidationSchema } from './env.validation-schema';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule.forRoot({validationSchema: envValidationSchema}), DbModule.forRoot(), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
