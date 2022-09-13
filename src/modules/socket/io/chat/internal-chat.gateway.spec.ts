import { Test, TestingModule } from '@nestjs/testing';
import { InternalChatGateway } from './internal-chat.gateway';

describe('InternalChatGateway', () => {
  let gateway: InternalChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalChatGateway],
    }).compile();

    gateway = module.get<InternalChatGateway>(InternalChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
