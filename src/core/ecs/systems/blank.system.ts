import {
  BaseSystem,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';
import { SectorEntity } from 'src/modules/repository/sector/entities/sector.entity';
import { WorksComponent } from '../components/works.component';
import { FacadeComponent } from '../components/facade.component';
import { CombinedFacadeComponent } from '../components/combined.facade.component';
import BlankTypes from 'src/core/@types/blank.types';

export class WorkBlanksSystem extends BaseSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;

  private sectors: SectorEntity[] = [];

  private blanks = [];
  constructor() {
    super(
      WorkBlanksSystem,
      Family.all(GeometryComponent, WorksComponent).get(),
    );
  }

  // перед обновлением, получаем набор необходимых объектов.
  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;

    if (!this.sectors || !this.sectors.length) {
      this.sectors = await this.orderCreator.getSectors();
    }
  }

  // Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д.
  async beforeUpdate(): Promise<void> {
    const book = this.getEngine<MYEngine>().bookEntity;
    if (book && book.state === BookState.EDITING) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntities(
    entities: ImmutableArray<MYEntity>,
    deltaTime: number,
  ): Promise<void> {
    const workOrders: BlankTypes.Root = [];

    for (const sector of this.sectors) {
      const workOrder: BlankTypes.Root2 = {
        sectorName: sector.name,
        blanks: [],
      };
      const sectorWorks = (sector.works || []).map((w) => ({ name: w.name }));
      for (const sectorBlank of sector.blanks) {
        for (const workIndex of sectorBlank.indices || []) {
          const blank: BlankTypes.Blank = {
            index: workIndex,
            works: [],
          };
          for (const sectorWork of sectorWorks) {
            const work: BlankTypes.Work = {
              name: sectorWork.name,
              documents: {} as BlankTypes.Documents,
            };
            for (const entity of entities) {
              const geometryData =
                entity.getComponent<GeometryComponent>(GeometryComponent)?.data;
              const workData =
                entity.getComponent<WorksComponent>(WorksComponent)?.data;
              const facadeData =
                entity.getComponent<FacadeComponent>(FacadeComponent)?.data;
              const combinedFacadeData =
                entity.getComponent<CombinedFacadeComponent>(
                  CombinedFacadeComponent,
                )?.data;
              const document = entity.documentEntity;
              const element = entity.elementEntity;
              const sample = await element.sample;

              if (!work.documents[document.id]) {
                work.documents[document.id] = [];
              }

              if (workIndex === 3) {
                if (facadeData) {   
                  if (facadeData.shirt) {
                    const shW = facadeData.shirt.works.find(
                      (w) => w.name === sectorWork.name,
                    );
                    if (shW) {
                      const item: BlankTypes.N1 = {
                        name: facadeData.shirt.name,
                        type: facadeData.shirt.type,
                        geometry: facadeData.shirt.geometry,
                        workData: { ...shW },
                      };
                      work.documents[document.id].push(item);
                    }
                  }
                }
                if (combinedFacadeData) {
                  const items = combinedFacadeData.shirts.map((shirt) => {
                    const shW = shirt.works.find(
                      (w) => w.name === sectorWork.name,
                    );
                    if (shW) {
                      return {
                        name: shirt.name,
                        type: shirt.type,
                        geometry: shirt.geometry,
                        workData: { ...shW },
                      };
                    }
                  });
                  work.documents[document.id].push(
                    ...items.filter((i) => Boolean(i)),
                  );
                }
              }
              if (workIndex === 2) {
                if (facadeData) {
                  if (facadeData.panel) {
                    const shW = facadeData.panel.works.find(
                      (w) => w.name === sectorWork.name,
                    );
                    if (shW) {
                      const item = {
                        name: facadeData.panel.name,
                        type: facadeData.panel.type,
                        geometry: facadeData.panel.geometry,
                        workData: { ...shW },
                      };
                      work.documents[document.id].push(item);
                    }
                  }
                }
                if (combinedFacadeData) {
                  const items = combinedFacadeData.panels.map((panel) => {
                    const shW = panel.works.find(
                      (w) => w.name === sectorWork.name,
                    );
                    if (shW) {
                      return {
                        name: panel.name,
                        type: panel.type,
                        geometry: panel.geometry,
                        workData: { ...shW },
                      };
                    }
                  });
                  work.documents[document.id].push(
                    ...items.filter((i) => Boolean(i)),
                  );
                }
              }
              if (workIndex === 1) {
                const shW = workData.works.find(
                  (w) => w.name === sectorWork.name,
                );
                if (shW) {
                  const item = {
                    name: element.name,
                    type: sample.name,
                    geometry: { ...geometryData },
                    workData: { ...shW },
                  };
                  work.documents[document.id].push(item);
                }
              }
            }
            blank.works.push(work);
          }
          workOrder.blanks.push(blank);
        }
      }
      workOrders.push(workOrder);
    }
    this.book.blanks = workOrders.filter(
      (wo) =>
        Boolean(wo?.blanks?.length) &&
        wo?.blanks.every((i) => Number(i.works.length)),
    );
  }
}
