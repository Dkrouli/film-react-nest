import { Test} from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const mockService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: mockService },
      ],
    }).compile();

    controller = module.get(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('должен передать DTO в service.createOrder и вернуть результат', async () => {
    const dto = { filmId: '123', seats: ['A1', 'A2'] } as any;
    const expectedResponse = { id: 'ord-1', status: 'confirmed' } as any;
    
    mockService.createOrder.mockResolvedValue(expectedResponse);

    const result = await controller.createOrder(dto);

    expect(mockService.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });
});
