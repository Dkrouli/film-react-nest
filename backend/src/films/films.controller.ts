import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const result = await this.filmsService.findSchedule(id);

    if (!result) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }

    return result;
  }

  @Post('')
  async create(@Body() dto: CreateFilmDto) {
    return this.filmsService.create(dto);
  }
}
