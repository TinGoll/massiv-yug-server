import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationGateway } from './authorization.gateway';

describe('AuthorizationGateway', () => {
  let gateway: AuthorizationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationGateway],
    }).compile();

    gateway = module.get<AuthorizationGateway>(AuthorizationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
