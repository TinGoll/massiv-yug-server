import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { BookDocumentType } from 'src/core/@types/app.types';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { ColorService } from 'src/modules/repository/color/color.service';
import { MaterialService } from 'src/modules/repository/material/material.service';
import { OrderService } from 'src/modules/repository/order/order.service';
import { PanelService } from 'src/modules/repository/panel/panel.service';
import { PatinaService } from 'src/modules/repository/patina/patina.service';
import { ProfileService } from 'src/modules/repository/profile/profile.service';
import { SectorService } from 'src/modules/repository/sector/sector.service';
import { VarnishService } from 'src/modules/repository/varnish/varnish.service';
import { WorkService } from 'src/modules/repository/work/work.service';
import { ItmOrder } from '../interfaces';
import { createdMigrateColor } from '../migration-data/colors';
import { createdMigrateMaterial } from '../migration-data/materials';
import { migrationNomenclature } from '../migration-data/nomenclature';
import { migrationPanels, migrationShirts } from '../migration-data/panels';
import { createdMigratePatina } from '../migration-data/patinas';
import { migrationProfiles } from '../migration-data/profile';
import { migrationSectors } from '../migration-data/sectors';
import { newStatuses } from '../migration-data/status';
import { createdMigrateVarnishes } from '../migration-data/varnishes';
import { works } from '../migration-data/work';
import { ItmHttpService } from '../services/itm-http.service';

@Injectable()
export class MigrationProvider {
  constructor(
    private readonly itmHttpService: ItmHttpService,
    private readonly colorService: ColorService,
    private readonly patinaService: PatinaService,
    private readonly varnishService: VarnishService,
    private readonly materialService: MaterialService,
    private readonly panelService: PanelService,
    private readonly sectorService: SectorService,
    private readonly orderService: OrderService,
    private readonly workService: WorkService,
    private readonly profileService: ProfileService,
    private readonly orderCreator: OrderCreator,
  ) {
    this.migrateColor(false)
      .then(() => {
        return this.migrationPatina(false);
      })
      .then(() => {
        return this.migrationVarnish(false);
      })
      .then(() => {
        return this.migrationMaterial(false);
      })
      .then(() => {
        return this.migrationPanel(false);
      })
      .then(() => {
        return this.migrationSector(false);
      })
      .then(() => {
        return this.migrationStatus(false);
      })
      .then(() => {
        return this.migrationWork(false);
      })
      .then(() => {
        return this.migrationProfile(false);
      })
      .then(() => {
        return this.migrationNomenclature(false);
      })
      .then(() => {
        return this.migrationShirts(false);
      });

    // this.migrateOrder(24621);
  }

  /** Миграция Цвета */
  async migrateColor(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Color Migration');

    const objects = createdMigrateColor;
    for (const color of objects) {
      const candidate = await this.colorService.findColorToName(color.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.colorService.updateColor({ ...updateData, ...color });
        console.log('Обновление', candidate);
        continue;
      }
      const newColor = await this.colorService.createColor(color);
      console.log('Добавление', newColor);
    }
  }

  async migrationPatina(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Patina Migration');
    const objects = createdMigratePatina;
    for (const obj of objects) {
      const candidate = await this.patinaService.findPatinaToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.patinaService.updatePatina({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.patinaService.createPatina(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationVarnish(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Varnis Migration');
    const objects = createdMigrateVarnishes;
    for (const obj of objects) {
      const candidate = await this.varnishService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.varnishService.update({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.varnishService.create(obj);
      console.log('Добавление', newObj);
    }
  }
  async migrationMaterial(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Materials Migration');
    const objects = createdMigrateMaterial;
    for (const obj of objects) {
      const candidate = await this.materialService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.materialService.update({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.materialService.create(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationSector(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Sector Migration');
    const objects = migrationSectors;
    for (const obj of objects) {
      const candidate = await this.sectorService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.sectorService.update({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.sectorService.create(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationStatus(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Status Migration');
    const objects = newStatuses;

    for (const obj of objects) {
      const { arr, ...objData } = obj;
      const candidate = await this.orderService.findStatusToName(objData.name);
      if (candidate) {
        const { ...updateData } = candidate;
        await this.orderService.updateStatus({ ...updateData, ...objData });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.orderService.createStatus(objData);
      console.log('Добавление', newObj);
    }
  }

  async migrationWork(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Works Migration');
    const objects = works;
    for (const obj of objects) {
      const candidate = await this.workService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.workService.update({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.workService.create(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationProfile(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Works Migration');
    const objects = migrationProfiles;

    for (const obj of objects) {
      const candidate = await this.profileService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.profileService.update({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.profileService.create(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationNomenclature(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Nomenclature Migration');
    const objects = migrationNomenclature;

    for (const obj of objects) {
      const candidate = await this.orderService.findSampleElementToName(
        obj.name,
      );
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;
        await this.orderService.updateSampleElement({ ...updateData, ...obj });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.orderService.createSampleElement(obj);
      console.log('Добавление', newObj);
    }
  }

  async migrationPanel(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Panels Migration');
    const objects = migrationPanels;
    for (const obj of objects) {
      const { shirtId, works, ...obj2 } = obj;
      const candidate = await this.panelService.findToName(obj.name);
      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;

        const shirt = await this.panelService.findShirtToId(obj.shirtId);

        const workArr = [];
        for (const w of works) {
          const work = await this.workService.findToId(w);
          if (work) {
            workArr.push(work);
          }
        }
        candidate.works = workArr;
        await this.panelService.getRepository().save(candidate);

        await this.panelService.update({
          ...updateData,
          ...obj2,
          shirt: obj.shirtId ? shirt : null,
        });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.panelService.create(obj2);
      console.log('Добавление', newObj);
    }
  }

  async migrationShirts(on: boolean = false): Promise<void> {
    if (!on) return;
    console.log('\x1b[36m%s\x1b[0m', 'Start Shirt Migration');
    const objects = migrationShirts;

    for (const obj of objects) {
      const { works, ...obj2 } = obj;
      const candidate = await this.panelService.findShirtToName(obj.name);
      if (candidate) {
        const { ...updateData } = candidate;

        const workArr = [];
        for (const w of works) {
          const work = await this.workService.findToId(w);
          if (work) {
            workArr.push(work);
          }
        }
        candidate.works = workArr;
        await this.panelService.getShirtRepository().save(candidate);

        await this.panelService.updateShirt({
          ...updateData,
          ...obj2,
        });
        console.log('Обновление', candidate);
        continue;
      }
      const newObj = await this.panelService.createShirt(obj2);
      console.log('Добавление', newObj);
    }
  }

  async migrateOrder(id: number) {
    const itmOrder$ = this.itmHttpService
      .get<ItmOrder>(`order/${id}`)
      .pipe(map((responce) => responce.data));
    const itmOrder = await firstValueFrom<ItmOrder, ItmOrder>(itmOrder$, {
      defaultValue: null,
    });

    const candidate = await this.orderService.findBookToId(id);
    if (candidate) {
      return;
    }

    let book = await this.orderCreator.addBook(1, {
      bookId: itmOrder.id,
      nameFromClient: itmOrder.clientNumber,
      note: itmOrder.note,
    });

    const document = await this.orderCreator.addDocument(book.id, {
      documentType: (itmOrder.orderType as unknown) as BookDocumentType,
      note: itmOrder.note
    });

    await this.orderCreator.assignColor(
      document.id,
      itmOrder.color?.type === 'Эмаль' ? 'Эмаль' : 'Морилка',
      { previousName: itmOrder.color?.name, note: itmOrder.color?.note },
    );

    await this.orderCreator.assignPatina(document.id, 'Однокомпонентная', {
      previousName: itmOrder.patina?.name,
      note: itmOrder.patina?.note,
    });

    await this.orderCreator.assignVarnish(document.id, 'Акриловый', {
      previousName: itmOrder.varnish?.name,
      note: itmOrder.varnish?.note,
    });

    const panelColor = await this.colorService.findColorToName(
      itmOrder.panel?.color?.name,
    );
    const panelMaterial = await this.materialService.findToName(
      itmOrder.panel?.material?.name,
    );

    await this.orderCreator.assignPanel(document.id, itmOrder.panel.name, {
      colorId: panelColor?.id,
      materialId: panelMaterial?.id,
    });

    await this.orderCreator.assignMaterial(
      document.id,
      itmOrder.material?.name,
    );

    await this.orderCreator.assignProfile(
      document.id,
      itmOrder.profile?.name,
      {},
    );

    for (const el of itmOrder.elements) {
      let element = await this.orderCreator.addElement(document.id, el.name, {
        components: [
          {
            componentName: 'component_geometry',
            data: {
              ...el.geometry,
            },
          },
        ],
      });
      if (!element) {
        element = await this.orderCreator.addDummy(document.id, {
          name: el.name,
          components: [
            {
              componentName: 'component_geometry',
              data: {
                ...el.geometry,
              },
            },
          ],
        });
      }
    }

    book = await this.orderService.findBookToId(book.id);

    console.log(book);
  }
}
