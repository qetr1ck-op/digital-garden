import { dbErrorCodes } from './constants/db-errors.const';
import { Global, Module } from '@nestjs/common';
import { MongoObjectIdPipe } from './pipes/mongo-object-id.pipe';
import { ResponseInterceptor } from './interceptors/response.interceptor';

const providers = [MongoObjectIdPipe, dbErrorCodes, ResponseInterceptor];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
