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
    findString?: string,
  ): Observable<BookEntity[]> {
    if (!findString) {
      return of([]);
    }
    return of(data).pipe(
      map((books) => {
        const params = findString
          .replace(/\s+/g, ' ')
          .trim()
          .toLocaleLowerCase()
          .split(' ');

        if (!params.length) return books;

        console.time('FirstWay');

        const primary: BookEntity[] = books.filter((book) => {
          let check: boolean = false;

          for (const param of params) {
            check = false;
            if (book.id === Number(param)) {
              check = true;
              continue;
            }
            if (!check) {
              break;
            }
          }

          return check;
        });

        console.timeEnd('FirstWay');


        console.time('SecondWay');
        const second: BookEntity[] = books.filter((book) => {
          let check: boolean = false;
          const documents = book.documents || [];
          for (const param of params) {
            check = false;

            if (String(book.id).includes(param)) {
              check = true;
              continue;
            }

            if (
              (book.nameFromClient || '')
                .toLocaleLowerCase()
                .includes(param.toLocaleLowerCase())
            ) {
              check = true;
              continue;
            }

            if (book.client) {
              const client = book.client;
              if (
                (client.login || '').toLocaleLowerCase().includes(param) ||
                (client.firstName || '').toLocaleLowerCase().includes(param)
              ) {
                check = true;
                continue;
              }
            }
            if (book.author) {
              const author = book.author;
              if (
                (author.login || '').toLocaleLowerCase().includes(param) ||
                (author.firstName || '').toLocaleLowerCase().includes(param)
              ) {
                check = true;
                continue;
              }
            }
            if (book.note) {
              if ((book.note || '').toLocaleLowerCase().includes(param)) {
                check = true;
                continue;
              }
            }

            if (book.documentType) {
              if (book.documentType.toLocaleLowerCase().includes(param)) {
                check = true;
                continue;
              }
            }

            let checkDocs = false;
            for (const doc of documents) {
              checkDocs = false;
              if (
                doc.material?.name &&
                doc.material.name.toLocaleLowerCase().includes(param)
              ) {
                checkDocs = true;
                continue;
              }

              if (
                doc.glossiness &&
                doc.glossiness.toLocaleLowerCase().includes(param)
              ) {
                checkDocs = true;
                continue;
              }
              if (
                doc.profile?.sample &&
                doc.profile.sample.name.toLocaleLowerCase().includes(param)
              ) {
                checkDocs = true;
                continue;
              }

              if (
                doc.color?.sample &&
                doc.color.sample.name.toLocaleLowerCase().includes(param)
              ) {
                checkDocs = true;
                continue;
              }

              if (
                doc.patina?.sample &&
                doc.patina.sample.name.toLocaleLowerCase().includes(param)
              ) {
                checkDocs = true;
                continue;
              }
              break;
            }

            check = checkDocs;
            if (!check) {
              break;
            }
          }

          if (check) {
            const exists = primary.find((b) => b.id === book.id);
            if (exists) check = false;
          }
          return check;
        });

        console.timeEnd('SecondWay');

        return [...primary, ...second].slice(0, 26);
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
