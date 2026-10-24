import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

export interface ISession {
  id: string;
  daytime: Date;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

@Schema({ collection: 'films' })
export class Film {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  duration: number;

  @Prop([
    {
      id: { type: String, required: true },
      daytime: { type: Date, required: true },
      hall: { type: String, required: true },
      rows: { type: Number, default: 0 },
      seats: { type: Number, default: 0 },
      price: { type: Number, default: 0 },
      taken: { type: [String], default: [] },
    },
  ])
  schedule: ISession[];

  @Prop()
  posterPath: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
