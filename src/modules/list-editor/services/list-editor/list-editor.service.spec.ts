import { Test, TestingModule } from '@nestjs/testing';
import { ListEditorService } from './list-editor.service';

describe('ListEditorService', () => {
  let service: ListEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListEditorService],
    }).compile();

    service = module.get<ListEditorService>(ListEditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
