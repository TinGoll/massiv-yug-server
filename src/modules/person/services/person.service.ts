import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonAddress } from '../entities/person.address.entity';
import { PersonBankAccount } from '../entities/person.bank.account.entity';
import { PersonCard } from '../entities/person.card.entity';
import { ClientAccount } from '../entities/person.client.account.entity';
import { PersonEmail } from '../entities/person.email.entity';
import { PersonEntity } from '../entities/person.entity';
import { PersonPhone } from '../entities/person.phone.entity';
import { FinancialAccount } from '../entities/personal.account.entity';
import { PersonRole } from '../enums/person-role.enum';
import { UserRole } from '../enums/user-role.enum';
import { AddressCreateInput } from '../inputs/address.input';
import { BankCreateInput } from '../inputs/bank.input';
import { CardCreateInput } from '../inputs/card.input';
import {
  ClientAccountCreateInput,
  ClientAccountUpdateInput,
} from '../inputs/client-account.input';
import { EmailCreateInput } from '../inputs/email.input';
import {
  ClientCreateInput,
  PersonCreateInput,
  PersonUpdateInput,
} from '../inputs/person.input';
import { PhoneCreateInput } from '../inputs/phone.input';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(PersonAddress)
    private readonly addressRepository: Repository<PersonAddress>,
    @InjectRepository(PersonBankAccount)
    private readonly bankRepository: Repository<PersonBankAccount>,
    @InjectRepository(PersonCard)
    private readonly cardRepository: Repository<PersonCard>,
    @InjectRepository(PersonEmail)
    private readonly emailRepository: Repository<PersonEmail>,
    @InjectRepository(PersonPhone)
    private readonly phoneRepository: Repository<PersonPhone>,
    @InjectRepository(ClientAccount)
    private readonly clientRepository: Repository<ClientAccount>,
    @InjectRepository(FinancialAccount)
    private readonly financialAccount: Repository<FinancialAccount>,
  ) {}

  // Создание клиента
  async createClient(input: ClientCreateInput): Promise<PersonEntity> {
    if (!input) {
      throw new HttpException('Некорректные данные', HttpStatus.BAD_REQUEST);
    }

    const { phone, clientAccountInput, bankInput, ...data } = input;
    const person = this.personRepository.create({ ...data });

    if (phone) {
      const phoneEntity = await this.phoneRepository.save({
        number: phone,
      });
      person.phones = [phoneEntity];
    }

    if (bankInput) {
      const bankAccounts = await this.bankRepository.save(bankInput);
      person.bankAccounts = [bankAccounts];
    }

    if (clientAccountInput) {
      const clientAccount = await this.clientRepository.save(
        clientAccountInput,
      );
      person.clientAccount = clientAccount;
    }

    person.personRoles = [PersonRole.CLIENT];

    return await this.personRepository.save(person);
  }

  // Получить всех клиентов.
  async allClients(): Promise<PersonEntity[]> {
    const persons = await this.personRepository.find({
      where: { deleted: false },
      relations: {
        clientAccount: true,
        bankAccounts: true,
        phones: true,
      },
    });
    const clients = persons.filter((p) =>
      (p.personRoles || []).find((r) => r === PersonRole.CLIENT),
    );

    return await Promise.all(
      clients.map(async (cl) => {
        const clientAccount = await cl.clientAccount;
        const bankAccounts = await cl.bankAccounts;
        const phones = await cl.phones;
        return {
          ...cl,
          clientAccount,
          bankAccounts,
          phones,
        };
      }),
    );
  }

  /**
   * Создание нового пользователя
   * @param input PersonCreateInput
   * Добавлено поле телефона, для удобства
   */
  async create(
    input: PersonCreateInput & { phone?: string },
  ): Promise<PersonEntity> {
    const { phone, ...data } = input;
    const person = this.personRepository.create({ ...data });
    if (phone) {
      const phoneEntity = await this.phoneRepository.save({
        number: phone,
      });
      person.phones = [phoneEntity];
    }
    return await this.personRepository.save(person);
  }
  /**
   * Изменение пользователя
   * @param input PersonUpdateInput
   */
  async update(input: PersonUpdateInput): Promise<PersonEntity> {
    await this.personRepository.update({ id: input.id }, { ...input });
    return (await this.findOne(input.id))!;
  }

  /** Сохранение сущности пользователя */
  async save(entity: PersonEntity): Promise<PersonEntity> {
    return await this.personRepository.save(entity);
  }

  /** Поиск пользователя */
  async findOne(id: number): Promise<PersonEntity | null> {
    return await this.personRepository.findOne({ where: { id } });
  }

  /** Выборка всех пользоввателей */
  async findAll(): Promise<PersonEntity[]> {
    return await this.personRepository.find();
  }

  /** Поис по логину, включает в себя пароль. */
  async findByLogin(login: string): Promise<PersonEntity | null> {
    const candidate = await this.personRepository
      .createQueryBuilder()
      .where('LOWER(login) = LOWER(:login)', { login })
      .getOne();
    if (!candidate) return null;
    return await this.personRepository.findOne({
      where: { id: candidate.id },
      select: [
        'id',
        'firstName',
        'lastName',
        'middleName',
        'login',
        'password',
        'status',
        'userRoles',
        'personRoles',
      ],
    });
  }

  async findIdByLogin(login: string): Promise<number> {
    const candidate = await this.personRepository
      .createQueryBuilder()
      .where('LOWER(login) = LOWER(:login)', { login })
      .getOne();
    return candidate?.id || 0;
  }

  /** Добавить адрес для пользователя */
  async addAddress(
    person: PersonEntity,
    input: AddressCreateInput,
  ): Promise<PersonAddress> {
    const address = this.addressRepository.create({ ...input });
    address.person = person;
    await this.addressRepository.save({ ...input });
    if (Array.isArray(person.addresses)) {
      person.addresses.push(address);
    } else {
      person.addresses = [address];
    }
    return address;
  }

  /** Удалить адрес по id */
  async removeAddress(id: number): Promise<number> {
    await this.addressRepository.delete(id);
    return id;
  }

  /** Банковский счет */
  async addBank(
    person: PersonEntity,
    input: BankCreateInput,
  ): Promise<PersonBankAccount> {
    const bank = this.bankRepository.create({ ...input });
    bank.person = person;
    if (Array.isArray(person.bankAccounts)) {
      person.bankAccounts.push(bank);
    } else {
      person.bankAccounts = [bank];
    }
    await this.bankRepository.save(bank);
    return bank;
  }
  /** Удалить банковский счет. */
  async removeBank(id: number): Promise<number> {
    await this.bankRepository.delete(id);
    return id;
  }

  /** Добавить банковскую карту */
  async addCard(
    person: PersonEntity,
    input: CardCreateInput,
  ): Promise<PersonCard> {
    const card = this.cardRepository.create({ ...input });
    card.person = person;
    console.log("card", card);
    
    await this.cardRepository.save(card);

    if (Array.isArray(person.cards)) {
      person.cards.push(card);
    } else {
      person.cards = [card];
    }
    return card;
  }
  /** Удалить банковскую карту */
  async removeCards(id: number): Promise<number> {
    await this.cardRepository.delete(id);
    return id;
  }

  /** Добавить email */
  async addEmail(
    person: PersonEntity,
    input: EmailCreateInput,
  ): Promise<PersonEmail> {
    const email = this.emailRepository.create({ ...input });
    email.person = person;
    await this.emailRepository.save(email);

    if (Array.isArray(person.emails)) {
      person.emails.push(email);
    } else {
      person.emails = [email];
    }

    return email;
  }
  /** удалить email */
  async removeEmail(id: number): Promise<number> {
    await this.emailRepository.delete(id);
    return id;
  }

  /** Добавить телефон */
  async addPhone(
    person: PersonEntity,
    input: PhoneCreateInput,
  ): Promise<PersonPhone> {
    const phone = this.phoneRepository.create({ ...input });
    phone.person = person;
    await this.phoneRepository.save(phone);
    if (Array.isArray(person.phones)) {
      person.phones.push(phone);
    } else {
      person.phones = [phone];
    }
    return phone;
  }
  /** Удалить телефон. */
  async removePhone(id: number): Promise<number> {
    await this.personRepository.delete(id);
    return id;
  }

  /** Создать клиентский аккаунт. */
  async createClientAccount(
    person: PersonEntity,
    input: ClientAccountCreateInput,
  ): Promise<ClientAccount> {
    const account = this.clientRepository.create({ ...input });
    account.person = person;
    if (!Array.isArray(person.personRoles)) {
      person.personRoles = [];
    }
    const exists = person.personRoles.find((r) => r === PersonRole.CLIENT);
    if (!exists) {
      person.personRoles.push(PersonRole.CLIENT);

      await this.personRepository.update(
        { id: person.id },
        { personRoles: person.personRoles },
      );
    }
    await this.clientRepository.save(account);
    person.clientAccount = account;
    return account;
  }

  async updateClientAccount(
    input: ClientAccountUpdateInput,
  ): Promise<ClientAccount> {
    await this.clientRepository.update({ id: input.id }, { ...input });
    return (await this.clientRepository.findOne({ where: { id: input.id } }))!;
  }

  async removeClientAccount(id: number): Promise<number> {
    await this.clientRepository.delete(id);
    return id;
  }

  /** Создать финансовый аккаунт */
  async createFinancialAccount(
    person: PersonEntity,
  ): Promise<FinancialAccount> {
    const account = this.financialAccount.create({});
    account.person = person;
    await this.financialAccount.save(account);
    return account;
  }
}
