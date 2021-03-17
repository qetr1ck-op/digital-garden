import { Expose } from "class-transformer";

export class ResponsePostDto {
  @Expose({name: '_id'})
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