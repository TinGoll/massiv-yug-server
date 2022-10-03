import { Injectable } from '@nestjs/common';
import { Engine } from 'yug-entity-component-system';
import { PanelAttachmentComponent } from '../components/attachment/panel.attachment.component';
import { ProfileAttachmentComponent } from '../components/attachment/profile.attacment.component';
import { GeometryComponent } from '../components/geometry/geometry.component';
import { ProductComponent } from '../components/product/product.component';
import { GeometrySystem } from '../systems/order-systems/geometry.system';
import { ProductGeometrySystem } from '../systems/order-systems/product-geometry.system';

@Injectable()
export class EngineProvider {

  private previous_time: number = 0;
  private interval: NodeJS.Timer;
  private interval_time: number = 5000;

  engine: Engine;

  constructor() {
    this.engine = Engine.create();
    this.define();
    this.start();
  }

  define() {


    this.engine.addSystem(new GeometrySystem());
    this.engine.addSystem(new ProductGeometrySystem());

    const entityFasad = this.engine.createEntity();

    
    entityFasad
      .add(new GeometryComponent(916, 446, 20))
      .add(new PanelAttachmentComponent())
      .add(new ProfileAttachmentComponent())
      .add(new ProductComponent());
    this.engine.addEntity(entityFasad);


  }






  /** Старт цикла */
  public start(): this {
    this.previous_time = Date.now();
    this.interval = setInterval(() => {
      // Дельта - тайм в секундах.
      const now = Date.now();
      this.engine.update((now - this.previous_time) * 0.001);
      this.previous_time = now;
    }, this.interval_time);
    console.log('\x1b[35m%s\x1b[0m', 'Engine started working');
    return this;
  }
  /** * Остановка цикла */
  public stop(): this {
    clearInterval(this.interval);
    return this;
  }
}
