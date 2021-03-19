import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  slug: string;

  @ArrayNotEmpty()
  tags: string[];

  @IsString()
  thumbnail: string;

  @IsString()
  body: string;

  @IsString()
  footer: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class PostResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  title: string;

  @Expose()
  date: string;

  @Expose()
  slug: string;

  @Expose()
  tags: string[];

  @Expose()
  thumbnail: string;

  @Expose()
  body: string;

  @Expose()
  footer: string;
}
