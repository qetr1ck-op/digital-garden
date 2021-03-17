import { Global, Module } from "@nestjs/common";
import { MongoObjectIdPipe } from "./pipes/mongo-object-id.pipe";

@Global()
@Module({
  providers: [MongoObjectIdPipe]
})
export class SharedModule {}