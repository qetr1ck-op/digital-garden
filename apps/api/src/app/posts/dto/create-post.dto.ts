import {ArrayNotEmpty, IsDateString, IsString} from 'class-validator'

export class CreatePostDto {
  @IsString()
  title?: string;

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