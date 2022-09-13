import { Test, TestingModule } from '@nestjs/testing';
import { ProfileEditorService } from './profile-editor.service';

describe('ProfileEditorService', () => {
  let service: ProfileEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileEditorService],
    }).compile();

    service = module.get<ProfileEditorService>(ProfileEditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
