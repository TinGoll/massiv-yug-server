import { Unit, WorkData } from 'src/core/@types/app.types';
import { Common } from 'src/core/common/common-function/common';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { SampleWorkEntity } from 'src/modules/repository/work/entities/sample.work.entity';
import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { WorkComponent } from '../components/work.component';
import { MYEngine } from '../engine/my-engine';

/**
 * Система для просчета работ.
 */
export class WorkSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;

  private isWorkRefrash = false;
  constructor() {
    super(WorkSystem, Family.all(WorkComponent, GeometryComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  /** Получаем книгу заказа, комнату и Order Creator, один раз, при создании комнаты. */
  addedToEngine(engine: MYEngine): void {
    super.addedToEngine(engine);
    this.book = engine.bookEntity;
    this.room = engine.room;
    this.orderCreator = this.room.roomManager.getOrderCreator();
  }

  async startProcessing(): Promise<void> {}

  async endProcessing(): Promise<void> {}

  protected async processEntity(
    entity: Entity,
    deltaTime: number,
  ): Promise<void> {
    const toFixed = 4;
    const workCmp = entity.getComponent<WorkComponent>(WorkComponent);
    const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    // Получаем массив данных.

    const workData = workCmp.data.workData || [];

    // Изменяем Данные.
    for (const wd of workData) {
      // Получаем шаблон работы.
      const work = await this.getWork(wd.workId);
      // Если шаблона работ нет, значит такая работа удалена или не существует
      // Пропускаем.
      if (!work) {
        wd.data = null;
        continue;
      }
      // Если данные о работе еще не инициализированы, инициализируем.
      if (!wd.data) {
        // Создаем объект работ.
        const wrkData: WorkData = {
          cost: 0,
          value: 0,
        };
        wd.data = wrkData;
      }

      const unit = wd.data.unit || work.unit;
      const price = wd.data.price || work.price;
      wd.data.value = Number(
        Common.getWeight(unit, gmCmp.data).toFixed(toFixed),
      );
      wd.data.cost = Number((wd.data.value * (price || 0)).toFixed(toFixed));
    }
  }

 

  /** Получить работу из книги */
  async getWork(id: number): Promise<SampleWorkEntity | null> {
    let work = (this.book.works || []).find((w) => w.id === id);
    // Если работа не найдена в книге, делаем запрос на все работы и загружаем их в книгу.
    // Загрузка выполняется один раз, поэтому проверяем, не было ли загрузки ранее.
    if (!work && !this.isWorkRefrash) {
      const works = await this.orderCreator.getWorks();
      for (const wr of works) {
        const candidate = this.book.works.find((w) => w.id === wr.id);
        if (!candidate) {
          this.book.works.push({ ...wr });
        }
      }
      work = (this.book.works || []).find((w) => w.id === id);
      // Устанавливаем флаг о загрузке работ.
      this.isWorkRefrash = true;
    }
    // Возвращаем работу или null
    return work || null;
  }
}
