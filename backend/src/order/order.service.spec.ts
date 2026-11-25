import { Test } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsService } from '@/films/films.service';

describe('OrderService', () => {
  let service: OrderService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findSchedule: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); 
    const module = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    service = module.get(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('должен проверить фильм через FilmsService и сохранить обновлённый фильм при создании заказа', async () => {
    const dto = {
      filmId: '1',
      sessionId: 'sess-1',
      seats: ['A1'],
      ticketsCount: 1,
    } as any;

    const film = {
      id: '1',
      schedule: [{ id: 'sess-1', taken: [] }],
    } as any;

    mockFilmsService.findById.mockResolvedValue(film);
    mockFilmsService.save.mockResolvedValue(film);

    const result = await service.createOrder(dto);

    expect(result.status).toBe('success');
    expect(result.orderId).toBeDefined();
    expect(mockFilmsService.findById).toHaveBeenCalledWith('1');
    expect(mockFilmsService.save).toHaveBeenCalledTimes(1);
  });

  it('должен вернуть ошибку, если фильм не найден', async () => {
    const dto = {
      filmId: '999',
      sessionId: 'sess-1',
      seats: ['A1'],
      ticketsCount: 1,
    } as any;

    mockFilmsService.findById.mockResolvedValue(null);

    const result = await service.createOrder(dto);

    expect(result.status).toBe('error');
    expect(result.message).toBe('Фильм не найден');
    expect(mockFilmsService.save).not.toHaveBeenCalled();
  });
});