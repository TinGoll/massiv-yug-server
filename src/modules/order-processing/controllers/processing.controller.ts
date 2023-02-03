import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { OrderCreator } from '../providers/order-creator';
import { OrderFinder } from '../providers/order-finder';

@Controller('api/processing')
export class ProcessingController {
  constructor(
    private readonly orderCreator: OrderCreator,
    private readonly orderFinder: OrderFinder,
  ) {}

  @Get('/elements')
  @HttpCode(200)
  elements(): Observable<string[]> {
    return from(this.orderCreator.getIdentifiers());
  }

  @Get('/find-orders')
  @HttpCode(200)
  findOrder(@Query('params') params?: string): Observable<any[]> | any {
    return this.orderFinder.get(null, params);
  }
}
