import { Test, TestingModule } from '@nestjs/testing';
import { HttpConsumingServiceService } from './http-consuming-service.service';

describe('HttpConsumingServiceService', () => {
  let service: HttpConsumingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpConsumingServiceService],
    }).compile();

    service = module.get<HttpConsumingServiceService>(HttpConsumingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
