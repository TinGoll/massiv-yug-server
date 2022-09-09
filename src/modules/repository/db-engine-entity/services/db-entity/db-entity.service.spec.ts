import { Test, TestingModule } from '@nestjs/testing';
import { DbEntityService } from './db-entity.service';

describe('DbEntityService', () => {
  let service: DbEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbEntityService],
    }).compile();

    service = module.get<DbEntityService>(DbEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
