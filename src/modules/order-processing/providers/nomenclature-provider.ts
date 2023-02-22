import { Injectable } from '@nestjs/common';
import {
  Observable,
  from,
  of,
  mergeMap,
  forkJoin,
  catchError,
  concatMap,
  interval,
  exhaustMap,
  Subscription,
  map,
  take,
} from 'rxjs';

import { OrderService } from 'src/modules/repository/order/order.service';
import {
  StatisticData,
  StatisticService,
} from 'src/modules/statistics/statistic.service';

interface NomenclatureRating {
  identifier: string;
  rating: number;
}

interface NomenclatureStatistics {
  identifiers: Array<NomenclatureRating>;
  lastId: number;
}

@Injectable()
export class NomenclatureProvider {
  private readonly updatePeriod = 86400000; //Сутки
  private currentStatistics: NomenclatureRating[] = [];
  private $statistic: Subscription;
  constructor(
    private readonly orderService: OrderService,
    private readonly statisticService: StatisticService,
  ) {
    this.start();
  }

  private start() {
    this.getStatistics()
      .pipe(take(1))
      .subscribe((value) => {
        this.currentStatistics = value.data.identifiers;
      });

    this.$statistic = interval(this.updatePeriod)
      .pipe(exhaustMap(() => this.getStatistics()))
      .subscribe((value) => {
        this.currentStatistics = value.data.identifiers;
      });
  }

  /** Получение отсортированного, согласно рейтингу, списка номенклатуры. */

  getNomenclature(): Observable<string[]> {
    return from(this.orderService.findAllElementSamples()).pipe(
      map((samples) => {
        const nomenclature = [
          ...new Set(
            samples.reduce<string[]>((acc, item) => {
              const identifiers = item.body.reduce<string[]>((iAcc, iItem) => {
                iAcc.push(iItem.identifier);
                return iAcc;
              }, []);
              identifiers
                .sort((a, b) => a.localeCompare(b))
                .sort((a, b) => {
                  const ratingA =
                    this.currentStatistics.find((r) => r.identifier === a)
                      ?.rating || 0;
                  const ratingB =
                    this.currentStatistics.find((r) => r.identifier === b)
                      ?.rating || 0;
                  if (ratingA > ratingB) {
                    return -1;
                  }
                  if (ratingA < ratingB) {
                    return 1;
                  }
                  return 0;
                });
              acc.push(...identifiers);
              return acc;
            }, []),
          ),
        ];
        return nomenclature;
      }),
    );
  }

  /** Получение обновленной статистики по использованию номенклатуры. Обновляется раз в сутки. */
  getStatistics(): Observable<StatisticData<NomenclatureStatistics>> {
    return this.statisticService
      .get<NomenclatureStatistics>('nomenclature_statistics')
      .pipe(
        mergeMap((statistic) => {
          if (statistic) {
            const newRating = from(
              <Promise<NomenclatureRating[] | null>>(
                this.orderService.getDocumentElementRepository().query(
                  `select element .name as identifier, count(element.name) as rating from "order_document_elements" element 
                  where "element"."id" > $1 group by element.name`,
                  [Number(statistic.data.lastId)],
                )
              ),
            );

            const newLastId = from(
              <Promise<Array<{ lastid: number }> | null>>(
                this.orderService
                  .getDocumentElementRepository()
                  .query(
                    `select max(element.id) as lastId from "order_document_elements" element where "element"."id" > $1`,
                    [Number(statistic.data.lastId)],
                  )
              ),
            );

            return forkJoin([of(statistic), newRating, newLastId]).pipe(
              concatMap(([oldStatistic, newRating, [last]]) => {
                oldStatistic.data.lastId =
                  last?.lastid || oldStatistic.data.lastId;

                if (!oldStatistic.data.identifiers) {
                  oldStatistic.data.identifiers = [];
                }
                for (const rating of newRating || []) {
                  const index = oldStatistic.data.identifiers.findIndex(
                    (r) =>
                      r.identifier.toLocaleLowerCase() ===
                      rating.identifier.toLocaleLowerCase(),
                  );
                  if (index === -1) {
                    oldStatistic.data.identifiers.push(rating);
                  } else {
                    oldStatistic.data.identifiers[index].rating =
                      Number(oldStatistic.data.identifiers[index].rating) +
                      Number(rating.rating);
                  }
                }
                return this.statisticService.set<NomenclatureStatistics>(
                  'nomenclature_statistics',
                  oldStatistic.data,
                );
              }),
            );
          } else {
            const firstReq = from(
              <Promise<NomenclatureRating[]>>(
                this.orderService
                  .getDocumentElementRepository()
                  .query(
                    `select element.name as identifier, count(element.name) as rating from "order_document_elements" element group by element.name`,
                    [],
                  )
              ),
            );

            const secondReq = from(
              <Promise<Array<{ lastid: number }> | null>>(
                this.orderService
                  .getDocumentElementRepository()
                  .query(
                    `select max(element.id) as lastId from "order_document_elements" element`,
                    [],
                  )
              ),
            );

            return forkJoin([firstReq, secondReq]).pipe(
              concatMap(([firstRes, secondRes]) =>
                this.statisticService
                  .set<NomenclatureStatistics>('nomenclature_statistics', {
                    identifiers: firstRes,
                    lastId: secondRes[0]?.lastid || 0,
                  })
                  .pipe(
                    catchError((error) => {
                      console.error('Error setting statistics:', error);
                      return of(null);
                    }),
                  ),
              ),
            );
          }
        }),
      );
  }
}
