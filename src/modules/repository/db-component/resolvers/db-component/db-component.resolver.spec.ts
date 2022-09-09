import { Test, TestingModule } from '@nestjs/testing';
import { DbComponentResolver } from './db-component.resolver';

describe('DbComponentResolver', () => {
  let resolver: DbComponentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbComponentResolver],
    }).compile();

    resolver = module.get<DbComponentResolver>(DbComponentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
