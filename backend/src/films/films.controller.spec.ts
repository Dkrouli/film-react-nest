import { Test} from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockService = {
    findAll: jest.fn(),
    findSchedule: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        { provide: FilmsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('должен вызвать filmsService.findAll() и вернуть список фильмов', async () => {
    const expectedFilms = [{ id: '1', title: 'Matrix' } as any];
    mockService.findAll.mockResolvedValue(expectedFilms);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedFilms);
  });

  it('должен выбросить NotFoundException, если film не найден в getSchedule', async () => {
    mockService.findSchedule.mockResolvedValue(null);

    await expect(controller.getSchedule('999')).rejects.toThrow(NotFoundException);
    expect(mockService.findSchedule).toHaveBeenCalledWith('999');
  });

  it('должен вызвать filmsService.create() с DTO', async () => {
    const dto = { title: 'New Film' } as any;
    const createdFilm = { id: '2', ...dto } as any;
    mockService.create.mockResolvedValue(createdFilm);

    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdFilm);
  });
});
