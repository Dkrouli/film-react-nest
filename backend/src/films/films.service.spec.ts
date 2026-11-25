import { Test } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { AppRepository } from '@/repository/app.repository';
import { NotFoundException } from '@nestjs/common';

describe('FilmsService', () => {
  let service: FilmsService;

  const mockRepo = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FilmsService, { provide: AppRepository, useValue: mockRepo }],
    }).compile();

    service = module.get(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('должен вызывать repo.findAll() при вызове findAll()', async () => {
    const expected = [{ id: '1', title: 'Matrix' } as any];
    mockRepo.findAll.mockResolvedValue(expected);

    const result = await service.findAll();

    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('должен выбрасывать NotFoundException, если фильм не найден при вызове save()', async () => {
    const nonExistingFilm = { id: '999', schedule: [] } as any;
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.save(nonExistingFilm)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockRepo.findOne).toHaveBeenCalledWith('999');
  });

  it('должен обновлять фильм при успешном сохранении', async () => {
    const existingFilm = { id: '1', schedule: [] } as any;
    const updatedFilm = { id: '1', schedule: ['10:00'] } as any;

    mockRepo.findOne.mockResolvedValue(existingFilm);
    mockRepo.update.mockResolvedValue({ ...existingFilm, schedule: ['10:00'] });

    const result = await service.save(updatedFilm);

    expect(mockRepo.findOne).toHaveBeenCalledWith('1');
    expect(mockRepo.update).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ schedule: ['10:00'] }),
    );
    expect(result.schedule).toEqual(['10:00']);
  });
});
