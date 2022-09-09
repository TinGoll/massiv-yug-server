import { Test, TestingModule } from '@nestjs/testing';
import { DbEntityResolver } from './db-entity.resolver';

describe('DbEntityResolver', () => {
  let resolver: DbEntityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbEntityResolver],
    }).compile();

    resolver = module.get<DbEntityResolver>(DbEntityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
