import { Injectable } from '@nestjs/common';
import {
  catchError,
  concatMap,
  firstValueFrom,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
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
import { PersonRole } from 'src/modules/person/enums/person-role.enum';
import { UserRole } from 'src/modules/person/enums/user-role.enum';
import { UserService } from 'src/modules/person/services/user.service';
import { PersonService } from 'src/modules/person/services/person.service';
import client from 'telegraf/typings/core/network/client';

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
    private readonly userService: UserService,
    private readonly personService: PersonService,
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
        return this.migrationShirts(false);
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
      });

    //this.migrateOrder(24621);

    // this.migrateClients();

    // this.migrateUsers();
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
      const { shirt: shirtName, ...obj2 } = obj;
      const candidate = await this.panelService.findToName(obj.name);

      const shirt = await this.panelService.findShirtToName(shirtName);

      if (candidate) {
        const { updatedAt, createdAt, ...updateData } = candidate;

        await this.panelService.getRepository().save(candidate);

        await this.panelService.update({
          ...updateData,
          ...obj2,
          shirt: shirt ? shirt : null,
        });
        console.log('Обновление', candidate);
        continue;
      }

      const newObj = await this.panelService.create({ ...obj2, shirtName });
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

  async migrateClients() {
    const clients$ = this.itmHttpService
      .get<ItmPerson.Client[]>(`person/clients`)
      .pipe(map((response) => response.data));

    const clients = await firstValueFrom<
      ItmPerson.Client[],
      ItmPerson.Client[]
    >(clients$, {
      defaultValue: null,
    });

    for (const client of clients) {
      const candidate$ = this.userService.loginExists(client.firstName);

      const candidate = await firstValueFrom<boolean, boolean>(candidate$, {
        defaultValue: false,
      });

      if (candidate) {
        console.log(`Пользователь ${client.firstName}, уже существует`);
        continue;
      }

      let password: string;
      if (client.password) {
        const password$ = this.userService.hashPassword(client.password);
        password = await firstValueFrom<string, string>(password$, {
          defaultValue: null,
        });
      }
      try {
        const person = await this.personService.create({
          firstName: client.firstName,
          gender: client.gender,
          lastName: client.lastName,
          middleName: client.middleName,
          login: client.firstName,
          password,
          settings: {
            itmLogin: client.login || null,
            itmPassword: password || null,
          } as { itmLogin: string; itmPassword: string },
        });

        for (const number of client.phones) {
          await this.personService.addPhone(person, {
            number,
          });
        }

        for (const email of client.emails) {
          await this.personService.addEmail(person, {
            email,
          });
        }

        await this.personService.addAddress(person, {
          city: client.city,
        });

        if (client.card?.number) {
          await this.personService.addCard(person, {
            number: client.card.number,
            cardHolder: client.card.cardHolder,
          });
        }

        await this.personService.addBank(person, {
          bank: client.bank,
          bik: client.bik,
          checkingAccount: client.checkingAccount,
          companyName: client.companyName,
          correspondentAccount: client.correspondentAccount,
          inn: client.inn,
          legalAddress: client.legalAddress,
        });

        await this.personService.createClientAccount(person, {
          alternativeName: client.firstName,
          companyName: client.companyName,
          payType: client.payType as any,
          extraData: {
            ...client.extraData,
          },
          comment: `Клиент перенесен из базы ITM. Id - ${client.id}`,
        });

        console.log(client.firstName, person);
      } catch (error) {
        console.log(error);
      }
      // break;
    }
  }

  async migrateUsers() {
    const users$ = this.itmHttpService
      .get<ItmPerson.Client[]>(`person/users`)
      .pipe(map((response) => response.data));

    const users = await firstValueFrom<ItmPerson.Client[], ItmPerson.Client[]>(
      users$,
      {
        defaultValue: null,
      },
    );

    for (const user of users) {
      const candidate$ = this.userService.loginExists(user.login);
      const candidate = await firstValueFrom<boolean, boolean>(candidate$, {
        defaultValue: false,
      });

      if (candidate) {
        console.log(`Пользователь ${user.firstName}, уже существует`);
        continue;
      }
      let password: string;
      if (!user.password) {
        user.password = String(user.id);
      }
      const password$ = this.userService.hashPassword(user.password);

      password = await firstValueFrom<string, string>(password$, {
        defaultValue: null,
      });

      try {
        const person = await this.personService.create({
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          gender: user.gender,
          login: user.login,
          password,
        });

        for (const number of user.phones) {
          await this.personService.addPhone(person, {
            number,
          });
        }

        for (const email of user.emails) {
          await this.personService.addEmail(person, {
            email,
          });
        }

        await this.personService.addAddress(person, {
          city: user.city,
        });

        if (user.card?.number) {
          await this.personService.addCard(person, {
            number: user.card.number,
            cardHolder: user.card.cardHolder,
          });
        }

        await this.personService.addBank(person, {
          bank: user.bank,
          bik: user.bik,
          checkingAccount: user.checkingAccount,
          companyName: user.companyName,
          correspondentAccount: user.correspondentAccount,
          inn: user.inn,
          legalAddress: user.legalAddress,
        });

        console.log('person', person);
      } catch (error) {
        console.log(error);
      }
    }
  }

  migrateUsers1() {
    const users$ = this.itmHttpService
      .get<ItmPerson.Client[]>(`person/users`)
      .pipe(map((response) => response.data))
      .pipe(concatMap((users) => from(users)))
      .pipe(
        concatMap((user) => {
          return this.userService
            .loginExists(user.login)
            .pipe(
              switchMap((isExists) => {
                console.log('user.firstName', user.firstName);

                if (isExists) {
                  console.log(`Пользователь ${user.firstName}, уже существует`);
                  return of(null);
                }
                let password: string;
                if (!user.password) {
                  user.password = String(user.id);
                }
                return this.userService.hashPassword(user.password).pipe(
                  switchMap((hashedPassword) => {
                    password = hashedPassword;
                    return this.personService.create({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      middleName: user.middleName,
                      gender: user.gender,
                      login: user.login,
                      password,
                    });
                  }),
                );
              }),
            )
            .pipe(
              concatMap((person) => {
                if (!person) {
                  return of(null);
                }
                console.log('phones: >>>>>>>>>>>>>', user.phones);

                return from(user.phones).pipe(
                  concatMap((number) =>
                    this.personService.addPhone(person, {
                      number,
                    }),
                  ),

                  concatMap((_) => {
                    console.log('emails: >>>>>>>', user.emails);

                    return from(user.emails).pipe(
                      concatMap((email) =>
                        this.personService.addEmail(person, {
                          email,
                        }),
                      ),
                    );
                  }),

                  concatMap((_) => {
                    console.log('card: >>>>>>>', user.card);
                    return of(user.card).pipe(
                      concatMap((card) => {
                        console.log('CARD >>>>>>>>>', card);
                        if (!card) return of(null);
                        const { number, cardHolder } = card;
                        return this.personService.addCard(person, {
                          number,
                          cardHolder,
                        });
                      }),
                    );
                  }),
                  concatMap((_) => {
                    console.log('phones, emails, card: done');
                    return of(null);
                  }),
                );
              }),
            );
        }),
      );

    users$.subscribe({
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Процесс окончен.');
      },
      next(value) {
        console.log(value);
      },
    });
  }

  async migrateOrder(id: number) {
    const itmOrder$ = this.itmHttpService
      .get<ItmOrder>(`order/${id}`)
      .pipe(map((response) => response.data));

    const itmOrder = await firstValueFrom<ItmOrder, ItmOrder>(itmOrder$, {
      defaultValue: null,
    });

    const candidate = await this.orderService.findBookToId(id);
    if (candidate) {
      return;
    }

    let book = await this.orderCreator.addBook(null, {
      bookId: itmOrder.id,
      nameFromClient: itmOrder.clientNumber,
      note: itmOrder.note,
    });

    const document = await this.orderCreator.addDocument(book, {
      documentType: itmOrder.orderType as unknown as BookDocumentType,
      note: itmOrder.note,
    });

    // Переделать!!!
    // await this.orderCreator.assignColor(
    //   document,
    //   itmOrder.color?.type === 'Эмаль' ? 'Эмаль' : 'Морилка',
    //   { previousName: itmOrder.color?.name, note: itmOrder.color?.note },
    // );

    // await this.orderCreator.assignPatina(document, 'Однокомпонентная', {
    //   previousName: itmOrder.patina?.name,
    //   note: itmOrder.patina?.note,
    // });

    // await this.orderCreator.assignVarnish(document, 'Акриловый', {
    //   previousName: itmOrder.varnish?.name,
    //   note: itmOrder.varnish?.note,
    // });

    // const panelColor = await this.colorService.findColorToName(
    //   itmOrder.panel?.color?.name,
    // );
    // const panelMaterial = await this.materialService.findToName(
    //   itmOrder.panel?.material?.name,
    // );

    // await this.orderCreator.assignPanel(document, itmOrder.panel.name, {
    //   colorId: panelColor?.id,
    //   materialId: panelMaterial?.id,
    // });

    // await this.orderCreator.assignMaterial(
    //   document,
    //   itmOrder.material?.name,
    // );

    // await this.orderCreator.assignProfile(
    //   document,
    //   itmOrder.profile?.name,
    //   {},
    // );

    for (const el of itmOrder.elements) {
      let element = await this.orderCreator.addElement(document, el.name, {
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

declare module ItmPerson {
  interface PersonType {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    personRoles: PersonRole[];
    userRoles: UserRole[];
    login: string;
    password?: string;
    gender: 'Male' | 'Female';
    phones: string[];
    emails: string[];
    city: string;
    card: {
      number: string;
      cardHolder: string;
    };
  }

  interface User extends PersonType {
    sector: string;
    status: 'fired' | 'active' | 'banned';
  }

  interface Client extends PersonType {
    companyName?: string;
    inn?: string;
    legalAddress?: string;
    correspondentAccount?: string;
    checkingAccount?: string;
    bank?: string;
    bik?: string;
    payType?: 'Карта' | 'Счет' | 'Наличные';
    extraData: {
      profiler?: boolean;
      prepaid?: boolean;
    };
  }
}
