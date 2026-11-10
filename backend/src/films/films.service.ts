import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/films.dto';
import { Film } from '@/entity/film';
import { AppRepository } from '@/repository/app.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly repo: AppRepository) {}

  async create(dto: CreateFilmDto) {
    return this.repo.create(dto);
  }

  async findAll(): Promise<Film[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Film | null> {
    const film = await this.repo.findOne(id);
    if (!film) {
    }
    return film;
  }

  async save(film: Film): Promise<Film> {
    console.log('Попытка сохранить фильм с id:', film.id);

    const existingFilm = await this.repo.findOne(film.id);

    if (!existingFilm) {
      throw new NotFoundException(
        `Фильм с ID ${film.id} не найден для обновления`,
      );
    }

    Object.assign(existingFilm, {
      schedule: film.schedule,
    });

    return this.repo.update(film.id, existingFilm);
  }

  async findSchedule(id: string) {
    const film = await this.findById(id);
    if (!film) return null;

    return { schedule: film.schedule };
  }
}
