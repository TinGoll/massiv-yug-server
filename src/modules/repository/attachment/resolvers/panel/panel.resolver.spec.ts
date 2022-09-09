import { Test, TestingModule } from '@nestjs/testing';
import { PanelResolver } from './panel.resolver';

describe('PanelResolver', () => {
  let resolver: PanelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanelResolver],
    }).compile();

    resolver = module.get<PanelResolver>(PanelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
