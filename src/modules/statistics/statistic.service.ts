import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatisticEntity, StatisticType } from './entities/statistic.entity';
import { Observable, from, switchMap } from 'rxjs';

export interface StatisticData<T extends object> extends StatisticEntity {
  data: T;
}

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(StatisticEntity)
    private readonly statisticRepository: Repository<StatisticEntity>,
  ) {}

  /** Получить статистику */
  get<T extends object = object>(
    type: StatisticType,
  ): Observable<StatisticData<T>> {
    return <Observable<StatisticData<T>>>from(
      this.statisticRepository.findOne({
        where: { type },
      }),
    );
  }

  /** Изменить статистику */
  set<T extends object = object>(
    type: StatisticType,
    data: T,
  ): Observable<StatisticData<T>> {
    return this.get<T>(type).pipe(
      switchMap((result) => {
        if (result) {
          result.data = data;
          return from(
            this.statisticRepository.update(result.id, { ...result }),
          ).pipe(switchMap(() => this.get<T>(type)));
        } else {
          return from(this.statisticRepository.save({ type, data }));
        }
      }),
    );
  }
}
