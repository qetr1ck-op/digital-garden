import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const PostEntityName = 'Post'
export type PostDocument = PostEntity & Document;

@Schema()
export class PostEntity {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  date: string;

  @Prop()
  slug: string;

  @Prop([String])
  tags: string[];

  @Prop()
  thumbnail: string;

  @Prop()
  body: string;

  @Prop()
  footer: string;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);