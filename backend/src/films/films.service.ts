import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { CreateFilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async create(dto: CreateFilmDto) {
    return this.filmModel.create(dto);
  }

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id: id }).exec();
  }

  async save(film: FilmDocument): Promise<FilmDocument> {
    console.log('Попытка сохранить фильм с _id:', film._id);

    const result = await this.filmModel
      .findOneAndUpdate(
        { _id: film._id },
        {
          $set: {
            schedule: film.schedule,
          },
        },
        {
          new: true,
          upsert: false,
        },
      )
      .exec();

    console.log('Результат сохранения:', result ? 'OK' : 'NOT FOUND');
    return result;
  }

  async findSchedule(id: string) {
    const film = await this.findById(id);
    if (!film) return null;
    return { schedule: film.schedule };
  }
}
