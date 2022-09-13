import { Test, TestingModule } from '@nestjs/testing';
import { WorkEditorService } from './work-editor.service';

describe('WorkEditorService', () => {
  let service: WorkEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkEditorService],
    }).compile();

    service = module.get<WorkEditorService>(WorkEditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
