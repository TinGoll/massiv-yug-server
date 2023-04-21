import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { MYEntity } from '../engine/my-entity';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import CombinedFacadeComponentTypes, {
  CombinedFacadeComponent,
} from '../components/combined.facade.component';
import { GeometryComponent } from '../components/geometry.component';
import FacadeComponentTypes, {
  getResetProfile,
} from '../components/facade.component';
import { Geometry } from 'src/core/common/models/geometry';
import cloneObject from 'src/core/common/structured-clone/structured-clone';

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

      const sampleEntity = await entity.elementEntity.sample;
      const defaultFacadeData = cloneObject<
        Partial<CombinedFacadeComponentTypes.CombinedFacadeData>
      >({
        ...sampleEntity?.default?.find(
          (d) => d.componentName === 'component_combined_facade',
        )?.data,
        ...entity.elementEntity.identifier?.componentData?.find(
          (d) => d.componentName === 'component_combined_facade',
        )?.data,
      });

      if (!facadeData.distances) {
        facadeData.distances = Array(20).map((item) => null);
      } else {
        // facadeData.distances[0] = Math.floor(Math.random() * 1000) + 200;
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

      let widthTransverseProfiles: number[] = []; // Ширина/Ширины поперечного профиля (для комбо-фасадов)
      // Если указано болше четырех велечин, значить указали отдельные ширины для поперечных профилей.
      // Отсекаем размеры поперечных данных.

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
          // Если угол сращивания 45 градусов, то весь профиль будет соотвествовать сторонам фасада.
          facadeData.profiles[0].geometry.height = Number(geometryData.height);
          facadeData.profiles[1].geometry.height = Number(geometryData.width);
          facadeData.profiles[2].geometry.height = Number(geometryData.height);
          facadeData.profiles[3].geometry.height = Number(geometryData.width);
        }

        if (splicingAngle === '90°') {
          // Если указали угол 90 градусов, определяем тип угла сращивания.
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
          // Если указана одна ширина, значит весь профиль имеет одинаковую ширину
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[0]);
        }
        if (points === 2) {
          // Если указано 2 ширины, значит левый и правый имеюе ширину первого элемента, а верхний и нижний - второго.
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[1]);
        }
        if (points === 3) {
          // если указано 3 ширины, значить левый - первый элемент, верхний -  второй элемент, правый - третий элемент
          // Нижний - первый элементю
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[2]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[0]);
        }
        if (points > 3) {
          // Если больше трех, значит для каждого профиля выбрана своя ширина
          facadeData.profiles[0].geometry.width = Number(profileWidths[0]);
          facadeData.profiles[1].geometry.width = Number(profileWidths[1]);
          facadeData.profiles[2].geometry.width = Number(profileWidths[2]);
          facadeData.profiles[3].geometry.width = Number(profileWidths[3]);
        }
        // Просчет геометрии с помощью стандартных вычислений.
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
      // Проверяем, существует ли массив панелей. Если существует, проверяем, не был ли присвоен null
      // Проверяем, не был ли присвоен null какой то из панелей, если был, сбрасываем на default
      facadeData.shirts = [];
      facadeData.overlayElements = [];

      if (!facadeData.panels) {
        facadeData.panels = defaultFacadeData.panels;
      } else {
        for (let i = 0; i < facadeData.panels.length; i++) {
          if (!facadeData.panels[i]) {
            facadeData.panels[i] = defaultFacadeData.panels[i] || null;
          }
        }
      }

      for (let i = 0; i < facadeData.panels.length; i++) {
        const panel = facadeData.panels[i];
        facadeData.shirts.push(null);
        facadeData.overlayElements.push(null);
        if (panel) {
          panel.geometry = Geometry.zeroing();
        }
      }

      const transverseProfileCount = (facadeData.panels || []).length;

      facadeData.transverseProfile = [];

      // Если кол-во филёнок больше 1
      if (transverseProfileCount > 1) {
        for (let i = 1; i < transverseProfileCount; i++) {
          const profile = {
            name: profileName,
            type: 'Профиль поперечный',
            geometry: Geometry.zeroing({
              depth: document?.profile?.sample?.depth || 0,
            }),
            index: i,
            material: materialName,
            parallel: 1,
          };

          profile.geometry.amount = geometryData.amount;
          profile.geometry.width = Number(widthTransverseProfiles[0]);

          profile.geometry.height =
            geometryData.width -
            facadeData.profiles[0].geometry.width +
            facadeData.profiles[2].geometry.width;
          profile.geometry = Geometry.calculate(profile.geometry);
          facadeData.transverseProfile.push(profile as any);
        }
      }

      if (!facadeData.calculationType) {
        facadeData.calculationType = 'from top border';
      }
      const calculationType = facadeData.calculationType;
      // Стандартное расстояние между профилем, в случае, если оно не выбрано пользовтаелем.
      const betweenProfileSize = Math.floor(
        geometryData.height / (facadeData.panels.length || 1),
      );

      // Перебираем все поперечные профили, и распологаем их равномерно, если значение не выбрано.
      for (let i = 0; i < facadeData.transverseProfile.length; i++) {
        const profile = facadeData.transverseProfile[i];
        const count = facadeData.transverseProfile.length;
        if (!facadeData.distances[i]) {
          const panel = facadeData.panels[i];
          const previusProfile = facadeData.transverseProfile[i - 1];
          // modifer - зависит от типа расчета. Например, от верхнего края профиля или нижнего. По умолчанию от середины.
          let modifer: number;
          // Если текущая панель - балюстрада, используем стандартную высоту балюстрады.
          if (panel && panel.type === 'Балюстрада') {
            // Модификатор зависит от типа отсчета.
            modifer = 0; // Если по нижнему краю, значит дистанция уже найдена.
            if (calculationType === 'from top border') {
              modifer = profile.geometry.width; // Если по верхнему краю, то прибавляем всю ширину.
            }
            if (calculationType === 'from middle') {
              modifer = profile.geometry.width / 2; // Если от середины, то прибавляем половину профиля.
            }
            // Получаем ширину предыдущего профиля.
            const width =
              previusProfile?.geometry?.width ||
              facadeData.profiles[0].geometry.width;
            // Получаем дистанцию предыдущего профиля.
            const distance = previusProfile?.profileDistance || 0;
            // Присваиваем дистанцию.
            facadeData.distances[i] =
              (facadeData.balusterSize || 0) + width + modifer + distance;
            profile.profileDistance = facadeData.distances[i];
            continue;
          }


          // Находим значение модификатора, в зависимости от выбранной точки отсчета.
          modifer = 0;
          if (calculationType === 'from top border') {
            modifer = profile.geometry.width / 2;
          }
          if (calculationType === 'from bottom border') {
            modifer = (profile.geometry.width / 2) * -1;
          }
          facadeData.distances[i] = betweenProfileSize * (i + 1) + modifer;
          profile.profileDistance = facadeData.distances[i];
        } else {
          profile.profileDistance = facadeData.distances[i];
        }
      }

      for (let i = 0; i < facadeData.panels.length; i++) {
        const panel = facadeData.panels[i];
        panel.index = i;
        if (!panel) {
          continue;
        }
        panel.geometry = Geometry.zeroing({
          amount: geometryData.amount,
        });
        if (!panel.type) {
          panel.type = 'Филёнка';
        }
        if (panel.type === 'Витрина') {
          panel.material = 'Стекло';
        } else {
          panel.material =
            document.panel.material?.name || document.material.name || null;
        }
        if (panel.type === 'Филёнка') {
          if (!document.panel?.sample) {
            // Создаем ошибку, если модель филенки не указана
            document.errors.panel = 'Не указана модель филёнки.';
          } else {
            panel.name = document.panel?.sample?.name;
            // Очищаем ошибку, если она была ранее.
            document.errors.panel = undefined;
          }
        }

        // Расчет геометрии панели, в зависимости от переменной profileDistance и calculationType
        const currentProfile = facadeData.transverseProfile[i];
        const previusTrsvProfile = facadeData.transverseProfile[i - 1] || null;

        const topWidth =
          currentProfile?.geometry?.width ||
          facadeData.profiles[3]?.geometry?.width;
        const botWidth =
          previusTrsvProfile?.geometry?.width ||
          facadeData.profiles[0]?.geometry?.width;
        const leftWidth = facadeData.profiles[0].geometry.width;
        const rightWidth = facadeData.profiles[2].geometry.width;

        let topDistance = geometryData.height;
        let botDistance = 0;

        // Находим верхнюю границу, если выше порперечный профиль
        if (currentProfile) {
          let modifer = currentProfile.geometry.width / 2;

          switch (calculationType) {
            case 'from bottom border':
              modifer = modifer * 2;
              break;
            case 'from middle':
              modifer = modifer * 1;
              break;
            default:
              modifer = modifer * 0;
              break;
          }
          const temp = currentProfile.profileDistance + modifer;
          topDistance = temp > topDistance ? topDistance : temp;
        }
        // Находим нижнюю границу, если нижу поперечный профиль.
        if (previusTrsvProfile) {
          let modifer = previusTrsvProfile.geometry.width / 2;
          switch (calculationType) {
            case 'from bottom border':
              modifer = modifer * 0;
              break;
            case 'from middle':
              modifer = modifer * 1;
              break;
            default:
              modifer = modifer * 2;
              break;
          }
          const temp = previusTrsvProfile.profileDistance - modifer;
          botDistance = temp < 0 ? 0 : temp;
        }

        panel.geometry.height =
          topDistance - botDistance - (topWidth + botWidth) + grooveDepth * 2;

        panel.geometry.width =
          geometryData.width - (leftWidth + rightWidth) + grooveDepth * 2;

        panel.geometry = Geometry.calculate(panel.geometry);

        if (panel.type === 'Филёнка' && document.panel.sample.shirt) {
          const shirt: FacadeComponentTypes.Shirt = {
            name: document.panel.sample.shirt.name,
            type: 'Рубашка',
            index: 0,
            material: panel.material,
            geometry: Geometry.zeroing({
              amount: Number(geometryData.amount),
            }),
          };
          shirt.geometry.height =
            panel.geometry.height -
            (document.panel.sample.shirt?.figoreaSize || 0) * 2;
          shirt.geometry.width =
            panel.geometry.width -
            (document.panel.sample.shirt?.figoreaSize || 0) * 2;
          shirt.geometry.depth = Number(
            document.panel.sample.shirt?.depthOverlay || 0,
          );
          shirt.geometry = Geometry.calculate(shirt.geometry);
          if (
            shirt.geometry.height < shirtMinSize ||
            shirt.geometry.width < shirtMinSize
          ) {
            facadeData.shirts[i] = shirt;
          }
        }
      }
      /****************************************************** */
    } catch (error) {
      console.log(error);
    }
  }
}
