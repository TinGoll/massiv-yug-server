import { Injectable } from '@nestjs/common';
import { PriceService } from './price.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { PriceBuilder } from './price-builder';
import { PriceCreateInput } from './create.input';
import { PriceEntity } from './price.entity';

@Injectable()
export class PriceMapper {
  private prices: PriceEntity[] = [];
  private fresh: boolean = false;

  constructor(private readonly priceService: PriceService) {
    this.initialize();
  }

  /** Создание нового прайса */
  createPrice(input: PriceCreateInput): Observable<PriceBuilder> {
    return this.priceService.create(input).pipe(
      switchMap((entity) => {
        if (!this.prices.find((p) => p.id === entity.id)) {
          this.prices.push(entity);
        }
        return of(new PriceBuilder(entity, this));
      }),
    );
  }

  /** Обновление прайса. */
  updatePrice(price: PriceEntity) {
    const { updatedAt, createdAt, deleted, ...data } = price;
    return this.priceService.update({
      ...data,
    });
  }

  /** Проверяет обновлен ли список прайсов и возвращает обновленный массив. */
  private updateCheck(): Observable<PriceEntity[]> {
    if (this.fresh) {
      return of(this.prices);
    }
    return this.priceService.find().pipe(
      tap((prices) => {
        this.prices = prices;
        this.fresh = true;
      }),
    );
  }
  /** Инициализация прайсов */
  private initialize(): void {
    this.updateCheck().subscribe();
    // this.createTestPrice().subscribe();
  }

  private createTestPrice(): Observable<string> {
    const input: PriceCreateInput = {
      name: 'Тест',
    };
    return this.priceService.create(input).pipe(
      switchMap((entity) => {
        const builder = new PriceBuilder(entity, this);
        builder
          .addElement('Фасад')
          .setPrice(10000)
          .addDocumentRule({
            color: {
              sample: {
                name: {
                  modiverValue: ['Красный', 'Синий'],
                  modiferOperator: 'multiplication',
                  modifer: 1.3,
                },
              },
            },
          })
          .addDocumentRule({
            material: {
              name: {
                modiverValue: ['Дуб', 'Ясень'],
                modiferOperator: 'multiplication',
                modifer: 1.2,
              },
            },
          })
          .end()
          .addElement('Карниз')
          .setPrice(2000)
          .addDocumentRule({
            glossiness: {
              modiverValue: '20%',
              modiferOperator: 'addition',
              modifer: 300,
            },
          })
          .end()
          .save()
          .end();
        return of('Тестовый прайс успешно создан');
      }),
    );
  }
}
