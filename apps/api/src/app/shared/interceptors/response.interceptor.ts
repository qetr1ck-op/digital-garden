import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  applyDecorators,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const OutputClass = this.reflector.get('ResponseDto', context.getHandler());

    if (!OutputClass) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) =>
        plainToClass(OutputClass, data, {
          strategy: 'excludeAll',
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        })
      )
    );
  }
}

const SetResponseForInterceptor = (ResponseDtoClass) =>
  SetMetadata('ResponseDto', ResponseDtoClass);

export const UseResponseInterceptor = (ResponseDtoClass) =>
  applyDecorators(
    SetResponseForInterceptor(ResponseDtoClass),
    UseInterceptors(ResponseInterceptor)
  );
