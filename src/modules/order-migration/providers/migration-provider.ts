import { Injectable, Logger } from '@nestjs/common';
import { Observable, interval, Subscription } from 'rxjs';
import { ColorService } from 'src/modules/repository/finishing/document-color/services/document-color/document-color.service';
import { PatinaService } from 'src/modules/repository/finishing/document-patina/services/document-patina/document-patina.service';
import { VarnishService } from 'src/modules/repository/finishing/document-varnish/services/document-varnish/document-varnish.service';
import { MaterialService } from 'src/modules/repository/material/services/document-material/document-material.service';
import {
  PersonRole,
  UserRole,
} from 'src/modules/repository/person/entities/person.entity';
import { PersonService } from 'src/modules/repository/person/services/person/person.service';
import { ProfileImporter } from 'src/modules/repository/profile/services/profile-importer';
import { SettingService } from 'src/modules/repository/setting-data/services/setting/setting.service';
import { ItmHttpService } from '../services/itm-http/itm-http.service';
import { OrderExtractorService } from '../services/order-extractor/order-extractor.service';
import { MigrationOrderData } from '../services/order-extractor/types/order-types';
import { createdMigrateColor } from './data/colors';
import { createdMigrateMaterial } from './data/materials';
import { createdMigratePatina } from './data/patinas';
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

  private startOrderId = 16999;

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
  ) {
    this.logger.log('Старт миграционного провайдера');

    // this.start();
    // this.migrateWorkers();
    // this.update(0);
    // this.addPhone()
    // this.migrateProfile();
    // this.migrateClients();
    // this.migrateMaterial();
    // this.migrateColors();
    // this.migratePatinas();
    // this.migrateVarnishes();
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
        const patina = await this.patinaService.createSample({...iterator});
        console.log(patina);
      }
    } catch (e) {
      this.errorLog(e);
    }
  }
  async migrateVarnishes() {
    try {
      for (const iterator of createdMigrateVarnishes) {
        const varnish = await this.varnishService.createSample({...iterator})
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

  async proccess(order: MigrationOrderData | null) {
    try {
      if (order) {
        // await this.settingService.set('order migration last id', {
        //   orderId: order.id,
        // });
      } else {
        return;
      }
    } catch (e) {}
  }

  /** Основной метод, вызывается автоматически, в качестве аргумента передается время, прошедшее между тактами. */
  async update(dt: number) {
    try {
      const last = await this.settingService.get<{ orderId: number }>(
        'order migration last id',
        { orderId: this.startOrderId },
      );
      const order = await this.orderExtractorService.getNextOrder(last.orderId);
      this.proccess(order);
    } catch (e) {
      this.errorLog(e);
    }
  }

  async migrateWorkers() {
    try {
      const workersData = await this.orderExtractorService.getWorkers();
      for (const entry of workersData) {
        const person = await this.personService.createPerson({
          firstName: entry.firstname || 'Не указано',
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
