import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Observable, from, iif, map, of, switchMap, tap } from 'rxjs';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { OrderService } from 'src/modules/repository/order/order.service';

export const DefaultOrderFinderCallback = (item: BookEntity) => {
  return <any>{
    id: item.id,
    client: item.client?.login,
    nameFromClient: item.nameFromClient,
    author: item.author?.login,
    documentType: item.documentType,
  };
};

@Injectable()
export class OrderFinder {
  private readonly freshTime = 1200000; // 20мин.

  private cache: BookEntity[] = [];

  private lastUpdateTime = 0; // Время последнего обновления
  private refreshForce = false; // Если true - освежить данные в любом случае.

  private logger = new Logger('OrderFinder');

  constructor(private readonly orderService: OrderService) {}

  /**
   * @param callback Функция обратного вызова, для преобразования ответа.
   * Установите null для использования стандартной.
   * @param params Параметры фильтрации.
   * @returns T
   */
  get<T extends any = any>(
    callback: ((item: BookEntity) => T) | null,
    params?: string,
  ): Observable<T[]> {
    if (!callback) callback = DefaultOrderFinderCallback;
    return iif(() => this.isFresh(), of(this.cache), this.refresh()).pipe(
      switchMap((data) => this.filter(data, params)),
      map((data = []) => {
        return data.map(callback);
      }),
    );
  }

  // Обновление данных
  refresh(): Observable<BookEntity[]> {
    return from(
      this.orderService.getBookRepository().find({
        relations: {
          author: true,
          client: true,
          status: true,
        },
        select: {
          id: true,
          barcode: true,
          nameFromClient: true,
          documentType: true,
        },
      }),
    ).pipe(
      tap((books) => {
        this.logger.debug(JSON.stringify(books[0], null, 2));

        this.lastUpdateTime = Date.now();
        this.refreshForce = false;
        this.cache = books;
        return books;
      }),
      map(() => this.cache),
    );
  }

  private filter(
    data: BookEntity[] = [],
    params?: string,
  ): Observable<BookEntity[]> {
    if (!params) {
      return of(data);
    }
    return of(
      data.filter((book) => {
        // прописать условия фильтрации.
        let check = false;
        if (book.id === Number(params)) {
          check = true;
        }
        return check;
      }),
    );
  }

  // Является ли свежим.
  private isFresh(): boolean {
    if (
      !this.lastUpdateTime ||
      this.refreshForce ||
      Date.now() - this.lastUpdateTime > this.freshTime
    ) {
      return false;
    }
    return true;
  }
}
