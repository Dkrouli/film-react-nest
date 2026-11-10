import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '@/entity/film';
import { FilmsRepository } from './films.repository';

@Injectable()
export class AppRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOne(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({ where: { id } });
  }

  async create(data: DeepPartial<Film>): Promise<Film> {
    const entity = this.filmRepository.create(data);
    return this.filmRepository.save(entity);
  }

  async update(id: string, data: DeepPartial<Film>): Promise<Film | null> {
    const film = await this.findOne(id);
    if (!film) return null;

    Object.assign(film, data);
    return this.filmRepository.save(film);
  }

  async delete(id: string): Promise<void> {
    await this.filmRepository.delete(id);
  }
}
