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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): any {
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

export const SetResponseForInterceptor = (ResponseDto) =>
  SetMetadata('ResponseDto', ResponseDto);

export const UseResponse = (ResponseDto) =>
  applyDecorators(
    SetResponseForInterceptor(ResponseDto),
    UseInterceptors(ResponseInterceptor)
  );
