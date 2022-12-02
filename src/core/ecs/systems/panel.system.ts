import { Panel } from 'src/core/@types/app.types';
import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { PanelComponent } from '../components/panel.component';
import { MYEngine } from '../engine/my-engine';
import { MYEntity } from '../engine/my-entity';

export class PanelSystem extends IteratingSystem {
  constructor() {
    super(PanelSystem, Family.all(GeometryComponent, PanelComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  public getEngine(): MYEngine {
    return <MYEngine>super.getEngine();
  }

  protected async processEntity(
    entity: MYEntity,
    deltaTime: number,
  ): Promise<void> {
    const document = entity.documentEntity;

    const panelCmp = entity.getComponent<PanelComponent>(PanelComponent);
    const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    const docPanel = document.panel;

    // console.log(docPanel);

    if (panelCmp.data === null || !docPanel.sample) return;
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
      // console.log(panel);
  }

  
}
