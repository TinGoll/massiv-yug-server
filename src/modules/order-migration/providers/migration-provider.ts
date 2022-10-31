import { Injectable, Logger } from '@nestjs/common';
import { Observable, interval, Subscription } from 'rxjs';
import { GeometryComponent } from 'src/modules/ecs/components/geometry.component';
import { ColorSampleEntity } from 'src/modules/repository/finishing/document-color/entities/sample-color.entity';

import { ColorService } from 'src/modules/repository/finishing/document-color/services/document-color/document-color.service';
import { PatinaService } from 'src/modules/repository/finishing/document-patina/services/document-patina/document-patina.service';
import { VarnishService } from 'src/modules/repository/finishing/document-varnish/services/document-varnish/document-varnish.service';
import { MaterialService } from 'src/modules/repository/material/services/document-material/document-material.service';
import { BookService } from 'src/modules/repository/order/services/book/book.service';
import { DocumentService } from 'src/modules/repository/order/services/document/document.service';
import { ElementService } from 'src/modules/repository/order/services/element/element.service';
import { PanelService } from 'src/modules/repository/panel/services/document-panel/document-panel.service';
import {
  PersonRole,
  UserRole,
} from 'src/modules/repository/person/entities/person.entity';
import { PersonService } from 'src/modules/repository/person/services/person/person.service';
import { ProfileImporter } from 'src/modules/repository/profile/services/profile-importer';
import { ProfileService } from 'src/modules/repository/profile/services/profile/profile.service';
import { SectorService } from 'src/modules/repository/sector/services/sector/sector.service';
import { SettingService } from 'src/modules/repository/setting-data/services/setting/setting.service';
import { WorkService } from 'src/modules/repository/work/services/work/work.service';

import { OrderExtractorService } from '../services/order-extractor/order-extractor.service';
import { MigrationOrderData } from '../services/order-extractor/types/order-types';
import { createdMigrateColor } from './data/colors';
import { createdMigrateMaterial } from './data/materials';
import { migrationNomenclature } from './data/nomenclature';
import { migrationPanels } from './data/panels';
import { createdMigratePatina } from './data/patinas';
import { migrationSectors } from './data/sectors';
import { newStatuses } from './data/status';
import { createdMigrateVarnishes } from './data/varnishes';

/**
 *
 */

@Injectable()
export class MigrationProvider {
  //private timeInterval: number = 300000; // Пять минут
  private timeInterval: number = 5000; // Пять секунд
  private intervalSubscription: Subscription;

  private previusTime: number = 0;

  private startOrderId = 1;

  logger: Logger = new Logger('MigrationPrivider');

  constructor(
    private readonly settingService: SettingService,
    private readonly orderExtractorService: OrderExtractorService,
    private readonly personService: PersonService,
    private readonly materialService: MaterialService,
    private readonly profileImporter: ProfileImporter,

    private readonly colorService: ColorService,
    private readonly patinaService: PatinaService,
    private readonly varnishService: VarnishService,
    private readonly elementSampleService: ElementService,
    private readonly panelService: PanelService,
    private readonly bookService: BookService,
    private readonly documentService: DocumentService,
    private readonly profileService: ProfileService,
    private readonly sectorService: SectorService,
    private readonly workService: WorkService,
  ) {
    this.logger.log('Старт миграционного провайдера');

    // this.start();

    // this.update(0);

    // this.migrateWorkers();
    // this.migrateClients();
    // this.migrateProfile();
    // this.migrateMaterial();
    // this.migrateColors();
    // this.migratePatinas();
    // this.migrateVarnishes();

    // this.migrateElementSample();

    // this.migrateStatuses()

    // this.migratePanels();
    // this.migrationTestElement();
    // this.serMaterial();

    // this.migrationSectors();

    // this.workDependences();

    // this.orderHeader();
  }
  async orderHeader() {
    try {
      const orders = await this.orderExtractorService.getHeaderDataAllorders();

      console.log(orders.find((o) => o.id === 17000));

    } catch (e) {
      this.errorLog(e);
    }
  }

  async workDependences() {
    try {

      const work1 = this.workService.create({
        name: 'Первичная шлифовка; зерно:120;',
        norm: 0,
        price: 80,
        unit: 'м²',
        data: {}
      });
      
      const work2 = this.workService.create({
        name: 'Первичная шлифовка; зерно:150;',
        norm: 0,
        price: 80,
        unit: 'м²',
        data: {},
      });

      await this.workService.save(work1);
      await this.workService.save(work2);

      const sector1 = await this.sectorService.findToName('Шлифовка');
      if (sector1) {
        if (!sector1.works) {
          sector1.works = [];
        }
        sector1.works.push(work1);
        await this.sectorService.save(sector1);
        console.log(sector1);
      }

      const sector2 = await this.sectorService.findToName('Шлифовка Патины');
      if (sector2) {
        if (!sector2.works) {
          sector2.works = [];
        }
        sector2.works.push(work1);
        await this.sectorService.save(sector2);  
        console.log(sector2);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrationSectors() {
    try {
      for (const iterator of migrationSectors) {
        const entity = this.sectorService.create({
          ...iterator,
        });
        await this.sectorService.save(entity);
        console.log(entity);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async setMaterial() {
    try {
      const orders = await this.orderExtractorService.getHeaderDataAllorders();
      for (const iterator of orders) {
        const order = await this.bookService.findOne(iterator.id);
        if (order) {
          const material = await this.materialService.findSampleToName(
            iterator.fasadMaterial,
          );
          if (material) {
            order.documents[0].material.sample = material;
          }
          await this.materialService.saveDocumentNode(
            order.documents[0].material,
          );
          console.log(order.id, order.documents[0].material);
        }
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateStatuses() {
    try {
      for (const iterator of newStatuses) {
        const status = this.bookService.createStatus({
          name: iterator.name,
          index: iterator.index,
        });
        await this.bookService.saveStatus(status);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  /**
   * Миграция заказа
   * @param order
   * @returns
   */
  async proccess(order: MigrationOrderData | null) {
    try {
      console.log('START MIGRATION ORDER');
      if (order) {
        await this.settingService.set('order migration last id', {
          orderId: order.id,
        });

        const book = this.bookService.createBookEntity({
          nameFromClient: order.orderNum,
          note: order.note,
        });

        const author = await this.personService.findToLogin(order.manager);
        const client = await this.personService.findToName(order.client);

        book.author = author;
        book.client = client;
        book.id = order.id;

        const document = this.documentService.createDocumentEntity({
          documentType: order.orderType as any,
        });

        book.documents = !book.documents ? [] : book.documents;
        document.elements = !document.elements ? [] : document.elements;

        document.note = order.note;

        document.resultData = {
          cost: order.orderCost,
          orderSquare: order.orderSquare,
          fasadeSquare: order.fasadeSquare,
          orderPay: order.orderPay,
        };

        book.resultData = {
          ...document.resultData,
        };

        /** Данные документа */
        if (order.colorName) {
          let colorSample: ColorSampleEntity;
          if (order.colorType === 'Морилка') {
            colorSample = await this.colorService.findSampleToName('Морилка');
          } else {
            colorSample = await this.colorService.findSampleToName('Эмаль');
          }

          const colorNode = this.colorService.addDocumentNode({
            previousName: order.colorName,
          });

          colorNode.sample = colorSample;

          await this.colorService.saveDocumentNode(colorNode);
          document.color = colorNode;
        }

        if (order.fasadModel) {
          const profileSample = await this.profileService.findSampleToName(
            order.fasadModel,
          );
          let angle: '90°' | '45°' | null = null;
          if (order.profileAngle === '45' || order.profileAngle === '45°') {
            angle = '45°';
          }
          if (order.profileAngle === '90' || order.profileAngle === '90°') {
            angle = '90°';
          }
          const profileNode = this.profileService.addDocumentNode({
            angle,
            widths: profileSample?.widths || [],
          });
          profileNode.sample = profileSample;

          await this.profileService.saveDocumentNode(profileNode);
          document.profile = profileNode;
        }

        if (order.patinaName) {
          const patinaSample = await this.patinaService.findSample(1);
          const patinaNode = this.patinaService.addDocumentNode({});
          patinaNode.previousName = order.patinaName;
          patinaNode.sample = patinaSample;
          patinaNode.note = order.patinaComment;
          await this.patinaService.saveDocumentNode(patinaNode);
          document.patina = patinaNode;
        }

        if (order.varnishName) {
          const varnishSample = await this.varnishService.findSample(1);
          const varnishNode = this.varnishService.addDocumentNode({});
          varnishNode.previousName = order.varnishName;
          varnishNode.note = order.varnishComment;
          varnishNode.sample = varnishSample;
          await this.varnishService.saveDocumentNode(varnishNode);
          document.varnish = varnishNode;
        }

        if (order.panelModel) {
          const panelSample = await this.panelService.findSampleToName(
            order.panelModel,
          );
          const panelNode = this.panelService.addDocumentNode();
          if (order.panelColorName) {
            const panelColorSample = await this.colorService.findSample(1);
            panelNode.color = panelColorSample;
          }
          if (order.panelMaterial) {
            const panelMaterialSample =
              await this.materialService.findSampleToName(order.panelMaterial);
            panelNode.material = panelMaterialSample;
          }
          panelNode.sample = panelSample;
          await this.panelService.saveDocumentNode(panelNode);
          document.panel = panelNode;
        }

        if (order.fasadMaterial) {
          const materialSample = await this.materialService.findSampleToName(
            order.fasadMaterial,
          );

          const materialNode = this.materialService.addDocumentNode({});
          materialNode.sample = materialSample;
          await this.materialService.saveDocumentNode(materialNode);
          document.material = materialNode;
        }

        for (const orderElement of order.elements) {
          let element = await this.elementSampleService.createElementToName(
            orderElement.name,
            true, // в случае неудачи, создать пустышку.
          );

          const cmp = element.components.find(
            (c) => c.componentName === 'component_geometry',
          );
          const data = cmp.data as GeometryComponent;
          data.height = orderElement.height;
          data.width = orderElement.width;
          if (orderElement.depth) data.depth = orderElement.depth;
          data.amount = orderElement.amount;
          await this.elementSampleService.save(element);
          document.elements.push(element);
        }

        await this.documentService.save(document);
        book.documents.push(document);

        /** Формирователь баркода */
        let barcodeLength = 6;
        let lenght = `${book.id}`.length;
        let repeat = barcodeLength - lenght < 0 ? 0 : barcodeLength - lenght;
        let barcode = `21${'0'.repeat(repeat)}${book.id}`;

        book.barcode = barcode;

        if (order.statisId) {
          const newStatus = newStatuses.find((s) => {
            return s.arr.find((ss) => ss === order.statisId);
          });
          if (newStatus) {
            const st = await this.bookService.findStatusToName(newStatus.name);
            book.status = st;
          }
        }

        await this.bookService.save(book);
        //const bData = await this.bookService.findOne(book.id);
        console.log(book);
      } else {
        return;
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrationTestElement() {
    try {
      const element = await this.elementSampleService.createElementToName(
        'Фасад глухой',
      );

      console.log(JSON.stringify(element, null, 2));
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migratePanels() {
    try {
      for (const iterator of migrationPanels) {
        const panel = await this.panelService.createSample({
          ...(<any>iterator),
        });
        console.log(panel);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateElementSample() {
    try {
      for (const iterator of migrationNomenclature) {
        const sample = await this.elementSampleService.createSample(iterator);
        console.log(sample);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateColors() {
    try {
      for (const iterator of createdMigrateColor) {
        const color = await this.colorService.createSample({ ...iterator });
        console.log(color);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }
  async migratePatinas() {
    try {
      for (const iterator of createdMigratePatina) {
        const patina = await this.patinaService.createSample({ ...iterator });
        console.log(patina);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }
  async migrateVarnishes() {
    try {
      for (const iterator of createdMigrateVarnishes) {
        const varnish = await this.varnishService.createSample({ ...iterator });
        console.log(varnish);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateMaterial() {
    try {
      for (const iterator of createdMigrateMaterial) {
        const material = await this.materialService.createSample({
          ...iterator,
        });
        console.log(material);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateClients() {
    try {
      const clientsData = await this.orderExtractorService.getClients();
      for (const entry of clientsData) {
        const person = await this.personService.createPerson({
          firstName: entry.clientName,
        });
        person.personRoles = [PersonRole.CLIENT];

        const phoneArr: string[] = [];
        if (entry.phone) phoneArr.push(entry.phone);
        if (entry.phone2) phoneArr.push(entry.phone2);
        const phones = await this.personService.createPersonPhones(
          ...phoneArr.map((number) => {
            // +7 911 ХХХ-ХХ-ХХ
            // 8 928 291 95 91
            let n = number.replace(/[^0-9]/g, '');
            if (n[0] === '8') {
              n = n.substring(1);
              n = '+7' + n;
            }
            return { number: n };
          }),
        );
        const emailArr: string[] = [];
        if (entry.email) emailArr.push(entry.email);
        if (entry.email2) emailArr.push(entry.email2);
        const emails = await this.personService.createPersonEmail(
          ...phoneArr.map((email) => ({ email })),
        );

        const bankAccounts = await this.personService.createPersonBankAccount({
          companyName: entry.companyName,
          inn: entry.inn,
          legalAddress: entry.legalAddress,
          correspondentAccount: entry.correspondentAccount,
          checkingAccount: entry.checkingAccount,
          bank: entry.bank,
          bik: entry.bik,
        });

        const addresses = await this.personService.createPersonAddresses({
          city: entry.city,
        });

        person.addresses = addresses;
        person.bankAccounts = bankAccounts;
        person.phones = phones;
        person.emails = emails;
        const manager = await this.personService.findToName(entry.manager);

        const clientAccData = {
          city: entry.city,
          alternativeName: entry.shortName || entry.clientName,
          companyName: entry.companyName,
          inn: entry.inn,
          legalAddress: entry.legalAddress,
          correspondentAccount: entry.correspondentAccount,
          checkingAccount: entry.checkingAccount,
          bank: entry.bank,
          bik: entry.bik,
          comment: entry.bank,
          managerId: manager?.id,
          payType: entry.payType,
          webSite: entry.webSite,
          extraData: {
            prepaid: !(entry.prepaid === 0),
            profiler: entry.profiler === 1,
          },
        };

        const account = await this.personService.createClientAccount({
          ...clientAccData,
        });

        person.clientAccount = account;
        const savedPerson = await this.personService.savePerson(person);
        this.logger.log('Новый Клиент ' + savedPerson.firstName, savedPerson);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateProfile() {
    try {
      await this.profileImporter.import();
    } catch (e) {
      this.errorLog(e);
    }
  }

  /** Основной метод, вызывается автоматически, в качестве аргумента передается время, прошедшее между тактами. */
  async update(dt: number) {
    try {
      const last = await this.settingService.get<{ orderId: number }>(
        'order migration last id',
        { orderId: this.startOrderId },
      );
      const order = await this.orderExtractorService.getNextOrder(last.orderId);
      if (!order) return;
      await this.proccess(order);
      await this.update(0); // УДАЛИТЬ
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateWorkers() {
    try {
      const workersData = await this.orderExtractorService.getWorkers();
      for (const entry of workersData) {
        const person = await this.personService.createPerson({
          firstName: entry.firstname || entry.name,
          lastName: entry.lastname,
          middleName: entry.middlename,
        });

        const phones = await this.personService.createPersonPhones(
          ...(entry.phone ? [entry.phone] : []).map((number) => {
            // +7 911 ХХХ-ХХ-ХХ
            // 8 928 291 95 91
            let n = number.replace(/[^0-9]/g, '');
            if (n[0] === '8') {
              n = n.substring(1);
              n = '+7' + n;
            }
            return { number: n };
          }),
        );

        const cards = await this.personService.createPersonCards(
          ...(entry.card ? [entry.card] : []).map((number) => ({ number })),
        );

        person.phones = phones;
        person.cards = cards;

        if (entry.name) {
          let roles: UserRole[] = [UserRole.GUEST];
          if (entry.permossionGroup === 2) roles.push(UserRole.MANAGER);
          if (entry.permossionGroup === 3) roles.push(UserRole.ADMIN);
          if (entry.permossionGroup === 4) roles.push(UserRole.ACCOUNTANT);
          if (entry.permossionGroup === 5) roles.push(UserRole.SBORKA);
          if (entry.permossionGroup === 6) roles.push(UserRole.SHLIFOVKA);
          if (entry.permossionGroup === 7) roles.push(UserRole.LAKIROVKA);
          if (entry.permossionGroup === 8) roles.push(UserRole.UPAKOVKA);
          if (entry.permossionGroup === 9) roles.push(UserRole.GRAND_PACKER);

          const account = await this.personService.createUserAccount({
            login: entry.name,
            password: entry.password || '',
            userRoles: [...roles],
            status: entry.status === -1 ? 'fired' : 'active',
          });

          person.userAccount = account;
        }
        const savedPerson = await this.personService.savePerson(person);

        this.logger.log(
          'Новый пользователь ' + savedPerson.firstName,
          savedPerson,
        );
      }
    } catch (e) {
      throw e;
    }
  }

  /** Старт генератора */
  start(): void {
    this.intervalSubscription = interval(this.timeInterval).subscribe({
      next: this.act.bind(this),
      error: this.errorLog.bind(this),
      complete: this.compliteLog.bind(this),
    });
  }

  /** Остановка генератора */
  stop() {
    this.intervalSubscription?.unsubscribe();
  }

  /** Вызывается во время ошибки генератора */
  errorLog(err: any): void {
    this.logger.log('Ошибка интервала', err);
  }

  /** вызывается, по окончанию работы генератора */
  compliteLog(): void {
    this.logger.log('Окончание работы.');
  }

  /** Приватный метод, вызвается генератором. */
  private act() {
    if (!this.previusTime) this.previusTime = Date.now();
    let now = Date.now();
    this.update(Date.now() - this.previusTime);
    this.previusTime = now;
  }
}
