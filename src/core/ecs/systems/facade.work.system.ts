import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { Family, IteratingSystem } from 'yug-entity-component-system';
import { MYEngine } from '../engine/my-engine';
import WorkComponentTypes, {
  WorksComponent,
} from '../components/works.component';
import CombinedFacadeComponentTypes, {
  CombinedFacadeComponent,
} from '../components/combined.facade.component';
import FacadeComponentTypes, {
  FacadeComponent,
} from '../components/facade.component';
import { GeometryComponent } from '../components/geometry.component';
import { MYEntity } from '../engine/my-entity';
import cloneObject from 'src/core/common/structured-clone/structured-clone';
import { Unit } from 'src/core/@types/app.types';
import { Geometry } from 'src/core/common/models/geometry';
import { SampleWorkEntity } from 'src/modules/repository/work/entities/sample.work.entity';

export class FacadeWorkSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  constructor() {
    super(
      FacadeWorkSystem,
      Family.all(WorksComponent, GeometryComponent)
        .one(CombinedFacadeComponent, FacadeComponent)
        .get(),
    );
  }

  // перед обновлением, получаем набор необходимых объектов.
  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;

    if (!this.book.works || !this.book.works.length) {
      await this.orderCreator.assignWorksBook(this.book);
    }
  }

  // Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д.
  async beforeUpdate(): Promise<void> {
    const book = this.getEngine<MYEngine>().bookEntity;
    if (book && book.state === BookState.EDITING) {
      console.log('book.state', book.state);
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntity(
    entity: MYEntity,
    deltaTime: number,
  ): Promise<void> {
    try {
      const workData =
        entity.getComponent<WorksComponent>(WorksComponent)?.data;

      const geometryData =
        entity.getComponent<GeometryComponent>(GeometryComponent)?.data;

      const facadeData =
        entity.getComponent<FacadeComponent>(FacadeComponent)?.data;

      const combinedFacadeData = entity.getComponent<CombinedFacadeComponent>(
        CombinedFacadeComponent,
      )?.data;

      const sampleEntity = await entity.elementEntity.sample;

      // Данные компонента работа, по умолчанию.
      const defaultWorkData = cloneObject<
        Partial<WorkComponentTypes.WorkComponentData>
      >({
        ...sampleEntity?.default?.find(
          (d) => d.componentName === 'component_works',
        )?.data,
        ...entity.elementEntity.identifier?.componentData?.find(
          (d) => d.componentName === 'component_works',
        )?.data,
      });

      if (!workData?.works) {
        workData.works = defaultWorkData.works;
      }

      // Расчет работ фасада
      for (const work of workData?.works || []) {
        if (work) {
          work.cost = 0;
          work.price = 0;
          const bookWork = this.getWork(work.name);
          this.assignWork(work, bookWork, geometryData);
        }
      }

      // Расчет работ комбо-фасада
      for (const work of combinedFacadeData?.works || []) {
        if (work) {
          work.cost = 0;
          work.price = 0;
          const bookWork = this.getWork(work.name);
          this.assignWork(work, bookWork, geometryData);
        }
      }

      // Расчет данных (филёнки, рубашки и профиля), стандартного фасада
      if (facadeData) {
        if (facadeData?.panel) {
          facadeData.panel.works = [];
          for (const work of facadeData.panelWorks || []) {
            const bookWork = this.getWork(work.name);
            const panelWork = { ...work };
            panelWork.price = 0;
            panelWork.cost = 0;
            this.assignWork(panelWork, bookWork, facadeData.panel.geometry);
            facadeData.panel.works.push(panelWork);
          }
        }

        if (facadeData.shirt) {
          facadeData.shirt.works = [];
          for (const work of facadeData.shirtWorks || []) {
            const bookWork = this.getWork(work.name);
            const shirtWork = { ...work };
            shirtWork.price = 0;
            shirtWork.cost = 0;
            this.assignWork(shirtWork, bookWork, facadeData.shirt.geometry);
            facadeData.shirt.works.push(shirtWork);
          }
        }

        if (facadeData.profiles?.length) {
          for (const profile of facadeData.profiles) {
            profile.works = [];
            for (const work of facadeData.profileWorks || []) {
              const bookWork = this.getWork(work.name);
              const profileWork = { ...work };
              profileWork.price = 0;
              profileWork.cost = 0;
              this.assignWork(profileWork, bookWork, profile.geometry);
              profile.works.push(profileWork);
            }
          }
        }
      }

      // Расчет работ вложенных сущностей для комбо-фасада.
      if (combinedFacadeData) {
        for (const panel of combinedFacadeData?.panels || []) {
          if (!panel) {
            continue;
          }
          panel.works = [];
          for (const work of combinedFacadeData.panelWorks || []) {
            const bookWork = this.getWork(work.name);
            const panelWork = { ...work };
            panelWork.price = 0;
            panelWork.cost = 0;
            this.assignWork(panelWork, bookWork, panel.geometry);
            panel.works.push(panelWork);
          }
        }

        for (const shirt of combinedFacadeData?.shirts || []) {
          if (!shirt) {
            continue;
          }
          shirt.works = [];
          for (const work of combinedFacadeData?.shirtWorks || []) {
            const bookWork = this.getWork(work.name);
            const shirtWork = { ...work };
            shirtWork.price = 0;
            shirtWork.cost = 0;
            this.assignWork(shirtWork, bookWork, shirt.geometry);
            shirt.works.push(shirtWork);
          }
        }

        for (const profile of combinedFacadeData?.profiles || []) {
          if (!profile) {
            continue;
          }
          profile.works = [];
          for (const work of combinedFacadeData?.profileWorks || []) {
            const bookWork = this.getWork(work.name);
            const profileWork = { ...work };
            profileWork.price = 0;
            profileWork.cost = 0;
            this.assignWork(profileWork, bookWork, profile.geometry);
            profile.works.push(profileWork);
          }
        }

        for (const profile of combinedFacadeData?.transverseProfile || []) {
          if (!profile) {
            continue;
          }
          profile.works = [];
          for (const work of combinedFacadeData?.profileWorks || []) {
            const bookWork = this.getWork(work.name);
            const profileWork = { ...work };
            profileWork.price = 0;
            profileWork.cost = 0;
            this.assignWork(profileWork, bookWork, profile.geometry);
            profile.works.push(profileWork);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private assignWork(
    work: WorkComponentTypes.Work,
    bookWork: SampleWorkEntity<string>,
    geometry: Geometry,
  ): void {
    if (!bookWork) {
      return;
    }
    work.workId = bookWork.id;
    work.salaryUnit = bookWork.salaryUnit;
    work.unit = bookWork.unit;
    work.price = Number(bookWork.price);
    work.value = this.getWeight(work.unit, geometry);
    work.cost = Number((work.price * work.value).toFixed(2)); // Расчет цены работы
  }

  private getWork(name: string) {
    return this.book?.works?.find((w) => w.name === name) || null;
  }

  // Приватная функция получения веса по еденице измерения
  private getWeight(unit: Unit, geometry: Geometry): number {
    switch (unit) {
      case 'м²':
        return Number(geometry?.square || 0);
      case 'м. куб.':
        return Number(geometry?.cubature || 0);
      case 'м.п':
        return Number(geometry?.linearMeters || 0);
      case 'п.м.п':
        return Number(geometry?.perimeter || 0);
      case 'шт.':
        return Number(geometry?.amount || 0);
      default:
        return 0;
    }
  }
}
