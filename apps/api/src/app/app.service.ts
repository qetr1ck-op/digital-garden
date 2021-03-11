import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CatDto {
  @ApiProperty()
  title: string;
}

export type CatsDto = CatDto[]

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  getCats(): CatsDto {
    return [{ title: 'cat1' }];
  }
}
