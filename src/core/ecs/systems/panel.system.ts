import { Panel } from 'src/core/@types/app.types';
import {
  Engine,
  Entity,
  Family,
  IteratingSystem,
} from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { PanelComponent } from '../components/panel.component';
import { ProfileComponent } from '../components/profile.component';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';
import { BookState } from 'src/modules/repository/order/entities/book.state';

/**
 * Система для расчета филёнок и рубашек.
 * Система не расчитывает филёнки комбинированных фасадов.
 */
export class PanelSystem extends IteratingSystem {
  constructor() {
    super(
      PanelSystem,
      Family.all(GeometryComponent, PanelComponent, ProfileComponent).get(),
    );
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getMYEngine().bookEntity;
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
    const document = entity.documentEntity;
    const documentProfileSample = document.profile?.sample;
    const docPanel = document.panel;
    const samplePanel = docPanel.sample;

    // Компоненты
    const panelCmp = entity.getComponent<PanelComponent>(PanelComponent);
    const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    const prfCmp = entity.getComponent<ProfileComponent>(ProfileComponent);

    // Очищаем массив филенок, для нового расчета
    panelCmp.data = { panels: [] };

    // Если филенка не задана,
    if (panelCmp.data === null || !samplePanel || !documentProfileSample) {
      return;
    }

    // Находим нужный профиль
    const leftProf = (prfCmp.data.profiles || []).find(
      (prf) => prf.name === 'Верхний',
    );
    const topProf = (prfCmp.data.profiles || []).find(
      (prf) => prf.name === 'Верхний',
    );
    const rightProf = (prfCmp.data.profiles || []).find(
      (prf) => prf.name === 'Верхний',
    );
    const botProf = (prfCmp.data.profiles || []).find(
      (prf) => prf.name === 'Верхний',
    );

    const parentHeight = gmCmp.data.height || 0;
    const parentWidth = gmCmp.data.width || 0;
    const parentAmount = gmCmp.data.amount || 0;

    // Создаем предварительный объект компонента филенки.
    const panel: Panel | null = {
      geometry: {
        square: 0,
        cubature: 0,
        perimeter: 0,
        linearMeters: 0,
      },
      index: 1,
      type: 'Филёнка',
      shirt: null,
      workData: [],
    };

    // Инициализируем работы для филенки.
    const pWorks = await (samplePanel?.works || []);
    panel.workData = pWorks.map((w) => ({ workId: w.id }));

    // Если шаблон филенки, содержит рубашку, добавляем ее в компонент.
    if (samplePanel.shirt) {
      panel.shirt = {
        geometry: {
          square: 0,
          cubature: 0,
          perimeter: 0,
          linearMeters: 0,
        },
        workData: [],
      };

      // Инициализация работ для рубашки.
      const shWorks = await (samplePanel?.shirt?.works || []);
      panel.shirt.workData = shWorks.map((w) => ({ workId: w.id }));
    }

    // Получаем необходимые переменные
    const leftProfWidth = leftProf?.geometry?.width || 0;
    const topProfWidth = topProf?.geometry?.width || 0;
    const rightProfWidth = rightProf?.geometry?.width || 0;
    const botProfWidth = botProf?.geometry?.width || 0;
    const grooveDepth = documentProfileSample.grooveDepth;

    // Записываем новые данные в компонент
    // Высота
    panel.geometry.height =
      parentHeight - (leftProfWidth + rightProfWidth) + grooveDepth * 2;

    // Ширина
    panel.geometry.width =
      parentWidth - (topProfWidth + botProfWidth) + grooveDepth * 2;
    // Количество
    panel.geometry.amount = parentAmount;

    // Площадь
    panel.geometry.square =
      (panel.geometry.height / gmCmp.mm) *
      (panel.geometry.width / gmCmp.mm) *
      panel.geometry.amount;

    // Периметр
    panel.geometry.perimeter =
      ((panel.geometry.height / gmCmp.mm) * 2 +
        (panel.geometry.width / gmCmp.mm) * 2) *
      panel.geometry.amount;

    // Погонные метры
    panel.geometry.linearMeters =
      (panel.geometry.height / gmCmp.mm) * panel.geometry.amount;

    // Если есть рубашка, расчитываем.
    if (panel.shirt) {
      // TODO Расчет может быть не точным, уточнить формулу
      const ShirtdepthOverlay = Number(samplePanel.shirt.depthOverlay);
      const figoreaSize = Number(samplePanel.figoreaSize);
      const Shirtindent = Number(samplePanel.shirt.indent);

      panel.shirt.geometry.height = panel.geometry.height - figoreaSize * 2;
      panel.shirt.geometry.width = panel.geometry.width - figoreaSize * 2;

      panel.shirt.geometry.amount = panel.geometry.amount;

      // Площадь
      panel.shirt.geometry.square =
        (panel.shirt.geometry.height / gmCmp.mm) *
        (panel.shirt.geometry.width / gmCmp.mm) *
        panel.shirt.geometry.amount;

      // Периметр
      panel.shirt.geometry.perimeter =
        ((panel.shirt.geometry.height / gmCmp.mm) * 2 +
          (panel.shirt.geometry.width / gmCmp.mm) * 2) *
        panel.shirt.geometry.amount;
      // погонные метры
      panel.shirt.geometry.linearMeters =
        (panel.shirt.geometry.height / gmCmp.mm) * panel.shirt.geometry.amount;

      // если рубашка меньше сантиметра, удаляем.
      if (panel.shirt.geometry.height < 10 || panel.shirt.geometry.width < 10)
        panel.shirt = null;
    }

    if (
      panel.geometry.height > grooveDepth * 2 &&
      panel.geometry.width > grooveDepth * 2
    ) {
      panelCmp.data.panels = [panel];
    }
  }
}
