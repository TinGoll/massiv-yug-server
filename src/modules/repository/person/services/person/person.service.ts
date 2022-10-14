import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ClientAccount } from '../../entities/client-account.entity';
import { PersonAddress } from '../../entities/person-address';
import { PersonBankAccount } from '../../entities/person-bank-account.entity';
import { PersonCard } from '../../entities/person-card-entity';
import { PersonEmail } from '../../entities/person-email-entity';
import { PersonPhone } from '../../entities/person-phone-entity';
import { PersonEntity, PersonRole } from '../../entities/person.entity';
import { UserAccount } from '../../entities/user-account.entity';
import {
  PersonClientAccountCreateInput,
  PersonCreateInput,
  PersonUserAccountCreateInput,
} from '../../inputs/person-create.input';
import { PersonUpdateInput } from '../../inputs/person-update.input';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    @InjectRepository(ClientAccount)
    private readonly clientAccountRepository: Repository<ClientAccount>,
    @InjectRepository(PersonCard)
    private readonly cardRepository: Repository<PersonCard>,
    @InjectRepository(PersonPhone)
    private readonly phoneRepository: Repository<PersonPhone>,
    @InjectRepository(PersonEmail)
    private readonly emailRepository: Repository<PersonEmail>,
    @InjectRepository(PersonAddress)
    private readonly addressRepository: Repository<PersonAddress>,
    @InjectRepository(PersonBankAccount)
    private readonly bankAccountRepository: Repository<PersonBankAccount>,
  ) {}

  /** Сохранение сущности */
  async savePerson(person: PersonEntity) {
    try {
      return await this.personRepository.save(person);
    } catch (e) {
      throw e;
    }
  }

  /** Создание нового person */
  async createPerson(input: PersonCreateInput): Promise<PersonEntity> {
    try {
      const person = await this.personRepository.save({ ...input });
      return person;
    } catch (e) {
      new WsException(e);
    }
  }

  async createPersonAddresses(
    ...addresses: Array<Omit<Partial<PersonAddress>, 'id'>>
  ): Promise<PersonAddress[]> {
    try {
      return await Promise.all(
        addresses.map(
          async (item) => await this.addressRepository.save({ ...item }),
        ),
      );
    } catch (e) {
      new WsException(e);
    }
  }

  async createPersonBankAccount(
    ...addresses: Array<Omit<Partial<PersonBankAccount>, 'id'>>
  ): Promise<PersonBankAccount[]> {
    try {
      return await Promise.all(
        addresses.map(
          async (item) => await this.bankAccountRepository.save({ ...item }),
        ),
      );
    } catch (e) {
      new WsException(e);
    }
  }

  async createPersonPhones(
    ...phones: Array<{ number: string; personId?: number }>
  ): Promise<PersonPhone[]> {
    try {
      return await Promise.all(
        phones.map(
          async (item) => await this.phoneRepository.save({ ...item }),
        ),
      );
    } catch (e) {
      new WsException(e);
    }
  }

  async createPersonCards(
    ...cards: Array<{ number: string; personId?: number }>
  ): Promise<PersonCard[]> {
    try {
      return await Promise.all(
        cards.map(async (item) => await this.cardRepository.save({ ...item })),
      );
    } catch (e) {
      new WsException(e);
    }
  }

  async createPersonEmail(
    ...emails: Array<{ email: string; personId?: number }>
  ): Promise<PersonEmail[]> {
    try {
      return await Promise.all(
        emails.map(
          async (item) =>
            await this.emailRepository.save({
              ...item,
            }),
        ),
      );
    } catch (e) {
      new WsException(e);
    }
  }

  /** Создание нового клиент - аккаунта person */
  async createClientAccount(
    input: PersonClientAccountCreateInput,
  ): Promise<ClientAccount> {
    try {
      const { id, ...createData } = input;
      const person = await this.find(createData.personId);
      if (person.clientAccount)
        throw new WsException('Для этого человека, уже создан аккаунт клиента');

      const savedAcc = await this.clientAccountRepository.save({
        ...createData,
      });
      return savedAcc;
    } catch (e) {
      new WsException(e);
    }
  }

  /** Создание нового юзер - аккаунта person */
  async createUserAccount(
    input: PersonUserAccountCreateInput,
  ): Promise<UserAccount> {
    try {
      const { personId, userRoles } = input;
      const person = await this.find(personId);
      if (person.userAccount)
        throw new WsException(
          'Для этого человека, уже создан аккаунт пользователя',
        );
      const account = this.userAccountRepository.create({ ...input });
      account.userRoles = userRoles;
      const savedAcc = await this.userAccountRepository.save(account);
      return savedAcc;
    } catch (e) {
      new WsException(e);
    }
  }

  /** Обновление person */
  async updatePerson(input: PersonUpdateInput): Promise<PersonEntity> {
    try {
      const { id, ...updateData } = input;
      await this.personRepository.update({ id }, { ...updateData });
      return await this.find(id);
    } catch (e) {
      new WsException(e);
    }
  }
  /** Обновление клиент - аккаунта person */
  async updateClientAccount(input: any): Promise<ClientAccount | void> {
    try {
      throw new WsException('Функция не реализована');
    } catch (e) {
      new WsException(e);
    }
  }
  /** Обновление юзер - аккаунта person */
  async updateUserAccount(input: any): Promise<UserAccount | void> {
    try {
      throw new WsException('Функция не реализована');
    } catch (e) {
      new WsException(e);
    }
  }

  /** Удаление  person */
  async deletePerson(id: number): Promise<number> {
    try {
      await this.personRepository.update({ id }, { deleted: true });
      return id;
    } catch (e) {
      new WsException(e);
    }
  }
  /** Удаление клиент - аккаунта person */
  async deleteClientAccount(id: number): Promise<number> {
    try {
      return 0;
    } catch (e) {
      new WsException(e);
    }
  }
  /** Удаление юзер - аккаунта person */
  async deleteUserAccount(id: number): Promise<number> {
    try {
      return 0;
    } catch (e) {
      new WsException(e);
    }
  }

  /** Получить одного person по id */
  async find(id: number): Promise<PersonEntity | null> {
    try {
      return await this.personRepository.findOne({ where: { id } });
    } catch (e) {
      new WsException(e);
    }
  }

  async findToName(name: string): Promise<PersonEntity | null> {
    try {
      return await this.personRepository.findOne({
        where: { firstName: name },
      });
    } catch (e) {
      new WsException(e);
    }
  }

  /** Получить список всех person, можно указать роли*/
  async findAll(roles: PersonRole[] = []): Promise<PersonEntity[]> {
    try {
      return await this.personRepository.find({
        where: [
          ...roles.map((r) => ({
            personRoles: r,
          })),
        ],
      });
    } catch (e) {
      new WsException(e);
    }
  }
}
