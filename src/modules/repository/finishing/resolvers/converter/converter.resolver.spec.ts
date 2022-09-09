import { Test, TestingModule } from '@nestjs/testing';
import { ConverterResolver } from './converter.resolver';

describe('ConverterResolver', () => {
  let resolver: ConverterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterResolver],
    }).compile();

    resolver = module.get<ConverterResolver>(ConverterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
