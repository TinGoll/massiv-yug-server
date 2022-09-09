import { Test, TestingModule } from '@nestjs/testing';
import { ColerService } from './coler.service';

describe('ColerService', () => {
  let service: ColerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColerService],
    }).compile();

    service = module.get<ColerService>(ColerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
