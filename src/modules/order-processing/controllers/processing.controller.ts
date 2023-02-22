import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { OrderCreator } from '../providers/order-creator';
import { OrderFinder } from '../providers/order-finder';
import { HistoryEntity, HistoryOperation } from '../entities/history.entity';
import { HistoryObject, HistoryService } from '../services/history.service';
import { NomenclatureProvider } from '../providers/nomenclature-provider';

@Controller('api/processing')
export class ProcessingController {
  constructor(
    private readonly orderCreator: OrderCreator,
    private readonly orderFinder: OrderFinder,
    private readonly historyService: HistoryService,
    private readonly nomenclatureProvider: NomenclatureProvider,
  ) {}

  @Get('/elements')
  @HttpCode(200)
  elements(): Observable<string[]> {
    return this.nomenclatureProvider.getNomenclature();
  }

  @Get('/find-orders')
  @HttpCode(200)
  findOrder(@Query('params') params?: string): Observable<any[]> | any {
    return this.orderFinder.get(null, params);
  }

  @Get('/order-history/:id')
  @HttpCode(200)
  history(
    @Param('id') id: string,
    @Query('operation') operation?: HistoryOperation,
  ): Observable<HistoryObject[]> {
    return this.historyService.getOrderHistory(
      Number(id),
      null,
      null,
      operation,
    );
  }

  @Get('/user-history/:userId')
  @HttpCode(200)
  userHistory(
    @Param('userId') userId: string,
    @Query('operation') operation?: HistoryOperation,
    @Query('skip') skip?: string,
  ): Observable<HistoryObject[]> {
    return this.historyService.getUserHistory(
      Number(userId),
      skip ? Number(skip) : null,
      operation,
    );
  }
}
