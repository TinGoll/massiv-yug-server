import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryEntity, HistoryOperation } from '../entities/history.entity';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';

export interface HistoryObject {
  id: number;
  operation: string;
  bookId: number;
  createdAt: Date;
  description?: any;
  userId: number;
  nameFromClient: string;
  client?: any;
  clientId?: any;
  statusid?: number;
  status?: string;
  user?: string;
}

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
  ) {}

  push(
    user: PersonEntity,
    book: BookEntity,
    operation: HistoryOperation,
    label: string,
    description?: string,
  ): Observable<any> {
    return of(
      this.historyRepository.create({
        operation,
        label,
        description,
      }),
    ).pipe(
      switchMap((entity) => {
        entity.book = book;
        entity.user = user;
        return from(this.historyRepository.save(entity));
      }),
    );
  }

  getOrderHistory(
    id: number,
    take: number = 50,
    skip: number = 0,
    operation?: HistoryOperation,
  ): Observable<HistoryObject[]> {
    const data: Array<number | string> = [id, take];
    if (operation) {
      data.push(operation);
    }
    return from(
      this.historyRepository.query(
        `select
        history.*,
        book.id as bookId,
        book."nameFromClient",
        "person" ."login",
        book."clientId",
        (
            select "authors"."login" from "persons" authors where "authors"."id" = "book"."authorId"
        ) as user
    from
        "book_history" history
        left join "order_books" book on history."bookId" = book."id"
        left join "persons" person on book."clientId" = person."id"
    where
        book."id" = $1 ${operation ? 'and history."operation" = $3' : ''}
    order by history.id DESC
    limit $2
    `,
        [...data],
      ),
    ).pipe(map((result) => result));
  }

  getUserHistory(
    userId: number,
    take: number = 50,
    operation?: HistoryOperation,
  ): Observable<HistoryObject[]> {
    const data: Array<number | string> = [userId, take];
    if (operation) {
      data.push(operation);
    }
    return from(
      this.historyRepository.query(
        `
    select
    history.id,
    history."operation",
    history ."bookId",
    history ."createdAt",
    history ."description",
    history ."userId",
    book."nameFromClient",
    "person" ."login" as client,
    book."clientId",
    status.id as statusId,
    status."name" as status,
    (
        select
            "authors" ."login"
        from
            "persons" authors
        where
            "authors" ."id" = "history" ."userId"
    ) as user
from
    "book_history" history
    left join "order_books" book on history."bookId" = book."id"
    left join "persons" person on book."clientId" = person."id"
    left join "book_statuses" status on book."statusId" = status."id"
where
    "history"."userId" = $1
    ${operation ? 'and history."operation" = $3' : ''}
    and exists (
        select
            1
        from
            "book_history" t2
        where
            "t2" ."bookId" = history ."bookId"
            and t2."operation" = history."operation"
            and "t2"."userId" = "history"."userId"
            and "t2" ."id" >= history ."id"
        group by
            "t2" ."bookId"
        HAVING
            count("t2" ."bookId") = 1
            or count("t2" ."bookId") = null
    )
    order by "history"."id" DESC
    limit $2`,
        [...data],
      ),
    ).pipe(map((result) => result));
  }
}

/**+
 * .find({
        order: {
          id: 'DESC',
        },
        where: {
          book: {
            id,
          },
          operation,
        },
        take,
        skip,
        select: {
          id: true,
          createdAt: true,
          label: true,
          description: true,
          operation: true,
          book: {
            id: true,
            nameFromClient: true,
            client: {
              login: true,
            },
          },
          user: {
            id: true,
            login: true,
          },
        },
      }),

        .createQueryBuilder('history')
        .leftJoinAndSelect('history.book', 'book')
        .select([
          'history.id',
          'history.operation',
          'history.createdAt',
          'history.label',
          'history.description',
          'book.id',
          'book.nameFromClient',
          'book.client',
        ])
        .where('book.id = :id', { id })
        .take(take)
        .skip(skip)
        .getManyAndCount(),
 */
