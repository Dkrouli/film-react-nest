import { Film } from '@/entity/film';

export interface FilmsRepository {
  findAll(): Promise<Film[]>;

  findOne(id: string): Promise<Film | null>;

  create(data: Partial<Film>): Promise<Film>;

  update(id: string, data: Partial<Film>): Promise<Film | null>;

  delete(id: string): Promise<void>;
}
