import { dbErrorCodes } from './constants/db-errors.const';
import { Global, Module } from '@nestjs/common';
import { MongoObjectIdPipe } from './pipes/mongo-object-id.pipe';

@Global()
@Module({
  providers: [MongoObjectIdPipe, dbErrorCodes],
  exports: [MongoObjectIdPipe, dbErrorCodes],
})
export class SharedModule {}
