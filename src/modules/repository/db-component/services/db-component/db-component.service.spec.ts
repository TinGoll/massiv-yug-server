import { Test, TestingModule } from '@nestjs/testing';
import { DbComponentService } from './db-component.service';

describe('DbComponentService', () => {
  let service: DbComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbComponentService],
    }).compile();

    service = module.get<DbComponentService>(DbComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
