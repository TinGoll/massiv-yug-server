import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { MYEntity } from '../engine/my-entity';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { CombinedFacadeComponent } from '../components/combined.facade.component';
import { GeometryComponent } from '../components/geometry.component';
import { getResetProfile } from '../components/facade.component';
import { Geometry } from 'src/core/common/models/geometry';

export class CombinedFacadeSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  constructor() {
    super(
      CombinedFacadeSystem,
      Family.all(CombinedFacadeComponent, GeometryComponent).get(),
    );
  }

  // перед обновлением, получаем набор необходимых объектов.
  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
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

  protected async processEntity(
    entity: MYEntity,
    deltaTime: number,
  ): Promise<void> {
    try {
      const facadeData = entity.getComponent<CombinedFacadeComponent>(
        CombinedFacadeComponent,
      ).data;
      const geometryData =
        entity.getComponent<GeometryComponent>(GeometryComponent).data;

      const document = entity.documentEntity;
      if (!document.errors) {
        document.errors = {};
      }
      // Обработка комбинированного фасада.
      /****************************************************** */
      // Для фасадов, поле "материал" являеться обязательным.
      if (!document.material) {
        document.errors.material = 'Не указан материал.';
      } else {
        document.errors.material = undefined;
      }

      // Данные профиля.
      if (!document.profile || !document.profile?.sample) {
        document.errors.profile = 'Не указана модель фасада.';
      } else {
        document.errors.profile = undefined;
      }

      const shirtMinSize = 10; //Минимальный размер рубашки
      const materialName = document.material.name || ''; // Сохраняем название материала документа.

      const sampleProfile = document.profile.sample; // Шаблон профиля

      const splicingAngle =
        document.profile.angle || sampleProfile?.angle || null; // Угол сращивания
      const profileWidths =
        document.profile.widths || sampleProfile?.widths || null; // Массив ширин профиля
      const grooveDepth = sampleProfile?.grooveDepth || 0; // Глубина паза
      const grooveThickness = sampleProfile?.grooveThickness || 0; // Толщина паза
      const bottomShelfThickness = sampleProfile?.bottomShelfThickness || 0; // Толщина нижней полки
      const chamferSize = sampleProfile?.chamferSize || 0; // размер фаски
      const tenonSize = sampleProfile?.tenonSize || 0; // размер шипа
      const transverseInside = sampleProfile?.transverseInside || null; // Тип угла
      const profileDepth = Number(sampleProfile.depth || 0); // Толщина профиля
      const profileName = sampleProfile?.name || '';

      facadeData.splicingAngle = splicingAngle;

      // Создаем 4 стандартных профиля.
      facadeData.profiles = getResetProfile(
        {
          depth: profileDepth,
          amount: Number(geometryData.amount),
        },
        { name: profileName, material: materialName },
      );

      if (sampleProfile && splicingAngle && profileWidths) {
        if (splicingAngle === '45°') {
          facadeData.profiles[0].geometry.height = Number(geometryData.height);
          facadeData.profiles[1].geometry.height = Number(geometryData.width);
          facadeData.profiles[2].geometry.height = Number(geometryData.height);
          facadeData.profiles[3].geometry.height = Number(geometryData.width);
        }

        if (splicingAngle === '90°') {
          if (transverseInside) {
            // Если тип угла не стандартный, например "Портафино"
            facadeData.profiles[0].geometry.height = Number(
              geometryData.height -
                facadeData.profiles[0].geometry.width * 2 +
                chamferSize * 2 +
                tenonSize * 2,
            );
            facadeData.profiles[1].geometry.height = Number(
              geometryData.width + 1,
            );
            facadeData.profiles[2].geometry.height = Number(
              geometryData.height -
                facadeData.profiles[2].geometry.width * 2 +
                chamferSize * 2 +
                tenonSize * 2,
            );
            facadeData.profiles[3].geometry.height = Number(
              geometryData.width + 1,
            );
          } else {
            // Если стандартный тип угла
            facadeData.profiles[0].geometry.height = Number(
              geometryData.height,
            );
            facadeData.profiles[1].geometry.height = Number(
              geometryData.width -
                facadeData.profiles[1].geometry.width * 2 +
                chamferSize * 2 +
                tenonSize * 2,
            );
            facadeData.profiles[2].geometry.height = Number(
              geometryData.height,
            );
            facadeData.profiles[3].geometry.height = Number(
              geometryData.width -
                facadeData.profiles[3].geometry.width * 2 +
                chamferSize * 2 +
                tenonSize * 2,
            );
          }
        }

        const points = profileWidths.length; // Определяем количество точек ширин профиля.

        let widthTransverseProfiles: number[] = []; // Ширина/Ширины поперечного профиля (для комбо-фасадов)

        if (points > 4) {
          widthTransverseProfiles.push(
            ...profileWidths.slice(4).map((w) => Number(w)),
          );
        } else {
          if (points === 1)
            widthTransverseProfiles.push(Number(profileWidths[0]));
          if (points >= 2)
            widthTransverseProfiles.push(Number(profileWidths[1]));
        }

        // В зависимости от указанных в массиве ширин профиля, присваиваем соотвествующие данные.
        if (points === 1) {
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[0]);
        }
        if (points === 2) {
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[1]);
        }
        if (points === 3) {
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[2]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[0]);
        }
        if (points > 3) {
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[2]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[3]);
        }

        facadeData.profiles[0].geometry = Geometry.calculate(
          facadeData.profiles[0].geometry,
        );
        facadeData.profiles[1].geometry = Geometry.calculate(
          facadeData.profiles[1].geometry,
        );
        facadeData.profiles[2].geometry = Geometry.calculate(
          facadeData.profiles[2].geometry,
        );
        facadeData.profiles[3].geometry = Geometry.calculate(
          facadeData.profiles[3].geometry,
        );
      }

      /****************************************************** */
    } catch (error) {
      console.log(error);
    }
  }
}
