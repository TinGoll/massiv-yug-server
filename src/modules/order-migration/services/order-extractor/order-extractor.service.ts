import { Injectable } from '@nestjs/common';
import { map, Observable, firstValueFrom, EMPTY } from 'rxjs';
import { ItmHttpService } from '../itm-http/itm-http.service';
import { MigrationClient } from './types/migration-clients';
import { MigrationWorker } from './types/migration-workers';
import { MigrationOrderData } from './types/order-types';

@Injectable()
export class OrderExtractorService {
  constructor(private readonly itmHttpService: ItmHttpService) {}

  /** Получить всех Клиентов */
  getClients(): Promise<MigrationClient[]> {
    try {
      const clients$ = this.itmHttpService
        .get<MigrationClient[]>(`service/migration/get-clients`)
        .pipe(map((response) => response.data));
      return firstValueFrom(clients$, { defaultValue: [] });
    } catch (e) {
      throw e;
    }
  }

  /** Получить всех работников */
  getWorkers(): Promise<MigrationWorker[]> {
    try {
      const workers$ = this.itmHttpService
        .get<MigrationWorker[]>(`service/migration/get-workers`)
        .pipe(map((response) => response.data));
      return firstValueFrom(workers$, { defaultValue: [] });
    } catch (e) {
      throw e;
    }
  }

  /** Получить массив заказов, по массиву id */
  getOrders(ids: number[]): Promise<MigrationOrderData[]> {
    const orders$ = this.itmHttpService
      .get<MigrationOrderData[]>(
        `service/migration/get-order-data/${ids.join(';')}`,
      )
      .pipe(map((response) => response.data));
    return firstValueFrom(orders$, { defaultValue: [] });
  }

  /**
   * Получение следующего заказа.
   * @param previusId id предыдущего заказа
   */
  getNextOrder(previusId: number): Promise<MigrationOrderData | null> {
    // firstValueFrom(EMPTY, { defaultValue: 0 });
    const order$ = this.itmHttpService
      .get<MigrationOrderData[] | null>(
        `service/migration/get-next-order-data/${previusId}`,
      )
      .pipe(
        map((response) => {
          if (!response.data) return null;
          const [entry] = response.data;
          return entry;
        }),
      );
    return firstValueFrom(order$, { defaultValue: null });
  }
}
