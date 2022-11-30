import { Controller, Get } from '@nestjs/common';
import { MaterialService } from 'src/modules/repository/material/material.service';

@Controller('api/test')
export class TestController {
  constructor(private readonly materialService: MaterialService) {}
  @Get()
 async test() {
    return await this.materialService.findAll();
  }

}
