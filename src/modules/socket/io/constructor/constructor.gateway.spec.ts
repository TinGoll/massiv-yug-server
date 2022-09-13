import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorGateway } from './constructor.gateway';

describe('ConstructorGateway', () => {
  let gateway: ConstructorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructorGateway],
    }).compile();

    gateway = module.get<ConstructorGateway>(ConstructorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
