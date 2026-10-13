import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsService } from '@/films/films.service';

@Injectable()
export class OrderService {
  constructor(private readonly filmsService: FilmsService) {}

  async createOrder(dto: CreateOrderDto) {
    if (!dto.sessionId) {
      return { status: 'error', message: 'Не указан ID сеанса' };
    }

    const film = await this.filmsService.findById(dto.filmId);
    if (!film) {
      return { status: 'error', message: 'Фильм не найден' };
    }

    const session = film.schedule.find((s: any) => s.id === dto.sessionId);
    if (!session) {
      return { status: 'error', message: 'Сеанс не найден' };
    }

    if (!dto.seats || dto.seats.length !== dto.ticketsCount) {
      return {
        status: 'error',
        message: 'Количество мест в массиве не совпадает с ticketsCount',
      };
    }

    for (const seatKey of dto.seats) {
      if (session.taken.includes(seatKey)) {
        return {
          status: 'error',
          message: `Место ${seatKey} уже занято`,
        };
      }
    }

    session.taken = [...session.taken, ...dto.seats];

    await this.filmsService.save(film);

    return {
      status: 'success',
      orderId: Math.random().toString(36).substr(2, 9),
      data: dto,
    };
  }
}
