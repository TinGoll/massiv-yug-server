import { Test, TestingModule } from '@nestjs/testing';
import { DocumentColorService } from './document-color.service';

describe('DocumentColorService', () => {
  let service: DocumentColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentColorService],
    }).compile();

    service = module.get<DocumentColorService>(DocumentColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
