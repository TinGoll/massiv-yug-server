import { Test, TestingModule } from '@nestjs/testing';
import { ColerResolver } from './coler.resolver';

describe('ColerResolver', () => {
  let resolver: ColerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColerResolver],
    }).compile();

    resolver = module.get<ColerResolver>(ColerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
