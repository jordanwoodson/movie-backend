// src/movies/movie.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  author: string;
}

export const MovieSchema =
  SchemaFactory.createForClass(Movie).plugin(uniqueValidator);
