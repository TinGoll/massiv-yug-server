import { BookResultData, DocumentResultData } from 'src/core/@types/app.types';
import {
  Family,
  Entity,
  BaseSystem,
  ImmutableArray,
  Engine,
} from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';

/**
 * Система для подсчета результатов.
 */
export class ResultSystem extends BaseSystem {
  constructor() {
    super(ResultSystem, Family.one(GeometryComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  protected async processEntities(
    entities: ImmutableArray<Entity>,
    deltaTime: number,
  ): Promise<void> {
    // console.time('FirstWay');
    const ents = this.getMYEngine().getEntities();
    const book = this.getMYEngine().bookEntity;
    const bookResult: BookResultData = {
      amountElements: 0,
      squares: {
        all: 0,
        groups: [],
      },
    };
    for (const document of book.documents || []) {
      const documentResult: DocumentResultData = {
        amountElements: 0,
        squares: {
          all: 0,
          groups: [],
        },
      };
      for (const element of document.elements || []) {
        // Находим сущность, соответствующую элементу документа.
        const entity = entities
          .toArray()
          .find((el) => el.id === element.id) as MYEntity;
        if (entity) {
          // Получаем шаблон сущности.
          const sample = await entity.elementEntity.sample;
          // Получаем компонент геометрии.
          const gmCmp =
            entity.getComponent<GeometryComponent>(GeometryComponent);
          // Обновляем площадь документа.
          documentResult.squares.all += Number(gmCmp.data?.square);
          // Находим по имени индекс группы.
          const index = documentResult.squares.groups.findIndex(
            (g) => g.name === sample.name,
          );
          if (index === -1) {
            documentResult.squares.groups.push({
              name: sample.name,
              amount: Number(gmCmp.data?.square),
            });
          } else {
            if (!documentResult.squares.groups[index]?.amount) {
              documentResult.squares.groups[index].amount = 0;
            }
            documentResult.squares.groups[index].amount += Number(
              gmCmp.data?.square,
            );
          }
        }
      }
      bookResult.squares.all += Number(documentResult.squares.all);
    }
    // console.timeEnd('FirstWay');
    // console.log('bookResult', JSON.stringify(bookResult, null, 2));
  }
}
