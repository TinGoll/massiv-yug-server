import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { PriceEntity } from './price.entity';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { PriceCreateInput } from './create.input';
import { PriceUpdateInput } from './update.input';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
  ) {}

  /** Создание нового прайса */
  create(input: PriceCreateInput): Observable<PriceEntity> {
    return this.findOne({ name: input.name }).pipe(
      switchMap((candidate) => {
        if (candidate) {
          return of(candidate);
        }
        return from(this.priceRepository.save(input));
      }),
      tap({
        error: (err) => {
          console.log('Создание нового прайса. Ошибка:', err.message);
        },
      }),
    );
  }

  /** Обновление записи прайса */
  update(input: PriceUpdateInput) {
    return from(this.priceRepository.update({ id: input.id }, { ...input }));
  }

  /** !!Окончательное удаление записи из базы данных!! */
  delete(entity: PriceEntity): Observable<any> {
    return from(this.priceRepository.delete({ id: entity.id }));
  }
  /** Удаление с возможностью восстановления */
  remove(entity: PriceEntity): Observable<boolean> {
    return from(
      this.priceRepository.update({ id: entity.id }, { deleted: true }),
    ).pipe(
      map(() => true),
      catchError((err) => of(false)),
    );
  }
  /** Восстановление удаленной записи прайса. */
  restore(entity: PriceEntity): Observable<boolean> {
    return from(
      this.priceRepository.update({ id: entity.id }, { deleted: false }),
    ).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
  /** найти несколько значений */
  find(
    args: FindOptionsWhere<Omit<PriceEntity, 'deleted'>> = {},
  ): Observable<PriceEntity[]> {
    return from(
      this.priceRepository.find({ where: { ...args, deleted: false } }),
    );
  }
  /** Найти одно значение */
  findOne(
    args: FindOptionsWhere<Omit<PriceEntity, 'deleted'>> = {},
  ): Observable<PriceEntity> {
    return from(
      this.priceRepository.findOne({ where: { ...args, deleted: false } }),
    );
  }
  /** Найти удаленный элемент. */
  findDeleted(
    args: FindOptionsWhere<Omit<PriceEntity, 'deleted'>> = {},
  ): Observable<PriceEntity[]> {
    return from(
      this.priceRepository.find({ where: { ...args, deleted: true } }),
    );
  }
}
