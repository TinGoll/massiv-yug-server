import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Family, IteratingSystem } from 'yug-entity-component-system';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import FacadeComponentTypes, {
  FacadeComponent,
  getResetProfile,
} from '../components/facade.component';
import { GeometryComponent } from '../components/geometry.component';
import { Geometry } from 'src/core/common/models/geometry';

/**
 * Система для расчета геометрических показателей.
 */
export class FacadeSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;

  constructor() {
    super(FacadeSystem, Family.all(FacadeComponent, GeometryComponent).get());
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
      const document = entity.documentEntity;
      if (!document.errors) {
        document.errors = {};
      }

      const facadeData =
        entity.getComponent<FacadeComponent>(FacadeComponent).data;
      const geometryData =
        entity.getComponent<GeometryComponent>(GeometryComponent).data;

      const shirtMinSize = 10; //Минимальный размер рубашки

      const materialName = document.material.name || '';
      // Для фасадов, поле "материал" являеться обязательным.
      if (!document.material) {
        document.errors.material = 'Не указан материал.';
      } else {
        document.errors.material = undefined;
        facadeData.material = document.material.name;
      }

      // Если объект - панель не определена, определяем.
      if (!facadeData.panel) {
        facadeData.panel = {
          type: 'Филёнка',
        };
      }
      // Если тип панели не определен, значит это филенка
      if (!facadeData.panel.type) {
        facadeData.panel.type = 'Филёнка';
      }
      // Если тип Филёнка, то название будем брать из шапки.
      if (facadeData.panel.type === 'Филёнка') {
        facadeData.panel.name = '';
        if (document.panel?.sample) {
          //Если модель филенки выбрана в шапке, присваиваем название.
          facadeData.panel.name = document.panel.sample.name;
          // Проверяем, не выбран ли для филенки другой материал.
          // Если не выбран, присваимваем общий материал.
          facadeData.panel.material =
            document.panel.material?.name || document.material.name || null;
          // Очищаем ошибку, если она была ранее.
          document.errors.panel = undefined;
        } else {
          // Создаем ошибку, если модель филенки не указана
          document.errors.panel = 'Не указана модель филёнки.';
        }
      }

      if (facadeData.panel.type === 'Витрина') {
        facadeData.panel.material = "Стекло"
      }
      // Обнуляем геометрию панели
      facadeData.panel.geometry = Geometry.zeroing({
        amount: Number(geometryData.amount),
      });

      // Данные профиля.
      if (!document.profile || !document.profile?.sample) {
        document.errors.profile = 'Не указана модель фасада.';
      } else {
        document.errors.profile = undefined;
      }

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

        //Расчет панели

        facadeData.panel.geometry.height =
          geometryData.height -
          (facadeData.profiles[1].geometry.width +
            facadeData.profiles[3].geometry.width) +
          grooveDepth * 2;
        facadeData.panel.geometry.width =
          geometryData.width -
          (facadeData.profiles[0].geometry.width +
            facadeData.profiles[2].geometry.width) +
          grooveDepth * 2;

        if (
          facadeData.panel.geometry.height < grooveDepth * 2 ||
          facadeData.panel.geometry.width < grooveDepth * 2
        ) {
          facadeData.panel = null;
          facadeData.shirt = null;
        } else {
          // Просчитываем все поля геометрии панели
          facadeData.panel.geometry = Geometry.calculate(
            facadeData.panel.geometry,
          );

          if (
            facadeData.panel.type === 'Филёнка' &&
            document.panel.sample.shirt
          ) {
            facadeData.shirt = {
              name: document.panel.sample.shirt.name,
              type: 'Рубашка',
              index: 0,
              material: facadeData.panel.material,
              geometry: Geometry.zeroing({
                amount: Number(geometryData.amount),
              }),
            };

            facadeData.shirt.geometry.height =
              facadeData.panel.geometry.height -
              (document.panel.sample.shirt?.figoreaSize || 0) * 2;
            facadeData.shirt.geometry.width =
              facadeData.panel.geometry.width -
              (document.panel.sample.shirt?.figoreaSize || 0) * 2;
            facadeData.shirt.geometry.depth = Number(
              document.panel.sample.shirt?.depthOverlay || 0,
            );

            facadeData.shirt.geometry = Geometry.calculate(
              facadeData.shirt.geometry,
            );

            if (
              facadeData.shirt.geometry.height < shirtMinSize ||
              facadeData.shirt.geometry.width < shirtMinSize
            ) {
              facadeData.shirt = null;
            }
          } else {
            facadeData.shirt = null;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
