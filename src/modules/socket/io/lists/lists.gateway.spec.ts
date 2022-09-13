import { Test, TestingModule } from '@nestjs/testing';
import { ListsGateway } from './lists.gateway';

describe('ListsGateway', () => {
  let gateway: ListsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsGateway],
    }).compile();

    gateway = module.get<ListsGateway>(ListsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
