import { Controller, Get, HttpCode } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { OrderCreator } from '../providers/order-creator';

@Controller('api/processing')
export class ProcessingController {
  constructor(private readonly orderCreator: OrderCreator) {}

  @Get('/elements')
  @HttpCode(200)
  materials(): Observable<string[]> {
    return from(this.orderCreator.getIdentifiers());
  }
}
