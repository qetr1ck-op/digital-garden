import { Injectable } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";

@Injectable()
export class DtoSerializerService {
  serialize<T extends ClassConstructor<unknown>>(toClass: T, entity: unknown) {
    return plainToClass(toClass, entity, {enableImplicitConversion: true, excludeExtraneousValues: true})
  }
}