import { Test, TestingModule } from '@nestjs/testing';
import { ColorEditorService } from './color-editor.service';

describe('ColorEditorService', () => {
  let service: ColorEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorEditorService],
    }).compile();

    service = module.get<ColorEditorService>(ColorEditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
