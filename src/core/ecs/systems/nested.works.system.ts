import { Unit } from 'src/core/@types/app.types';
import { Common } from 'src/core/common/common-function/common';
import { Geometry } from 'src/core/common/models/geometry';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { SampleWorkEntity } from 'src/modules/repository/work/entities/sample.work.entity';
import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { PanelComponent } from '../components/panel.component';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';

/***
 * Система для расчета работ филёнок и рубашек.
 */
export class NestedWorkSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;

  private isWorkRefrash = false;
  constructor() {
    super(NestedWorkSystem, Family.all(PanelComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    console.log('beforeUpdate NestedWorkSystem');

    const book = this.getMYEngine().bookEntity;
    if (book && book.state === BookState.CALCULATION_OF_BLANKS) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  /** Получаем книгу заказа, комнату и Order Creator, один раз, при создании комнаты. */
  addedToEngine(engine: MYEngine): void {
    super.addedToEngine(engine);
    this.book = engine.bookEntity;
    this.room = engine.room;
    this.orderCreator = this.room.roomManager.getOrderCreator();
  }

  protected async processEntity(
    entity: Entity,
    deltaTime: number,
  ): Promise<void> {
    try {
      const toFixed = 4; // Точность
      const panelCmp = entity.getComponent<PanelComponent>(PanelComponent);

      for (const panel of panelCmp?.data?.panels || []) {
        const panelWorkData = panel.workData || [];
        const shirtWorkData = panel.shirt?.workData || [];
        const panelGeometry = panel.geometry;
        const shirtGeometry = panel.shirt?.geometry;

        for (const pwd of panelWorkData) {
          const work = await this.getWork(pwd.workId);
          if (!work) {
            pwd.data = null;
            continue;
          }
          if (!pwd.data) {
            pwd.data = {
              value: 0,
              cost: 0,
            };
          }
          const price = pwd.data.price || work.price;
          const unit = pwd.data.unit || work.unit;
          pwd.data.value = Number(
            Common.getWeight(unit, panelGeometry).toFixed(toFixed),
          );
          pwd.data.cost = Number(
            (pwd.data.value * (price || 0)).toFixed(toFixed),
          );
        }

        if (panel.shirt) {
          for (const swd of shirtWorkData) {
            const work = await this.getWork(swd.workId);
            if (!work) {
              swd.data = null;
              continue;
            }
            if (!swd.data) {
              swd.data = {
                value: 0,
                cost: 0,
              };
            }
            const price = swd.data.price || work.price;
            const unit = swd.data.unit || work.unit;
            swd.data.value = Number(
              Common.getWeight(unit, shirtGeometry).toFixed(toFixed),
            );
            swd.data.cost = Number(
              (swd.data.value * (price || 0)).toFixed(toFixed),
            );
          }
        }
      }
    } catch (error) {
      console.log('NestedWorkSystem:', error);
    }
  }

  // Приходится дублировать функцию, так как нет возмодности внедрить зависимость.
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
