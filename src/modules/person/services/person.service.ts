import { Injectable } from '@nestjs/common';
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
import { AddressCreateInput } from '../inputs/address.input';
import { BankCreateInput } from '../inputs/bank.input';
import { CardCreateInput } from '../inputs/card.input';
import {
  ClientAccountCreateInput,
  ClientAccountUpdateInput,
} from '../inputs/client-account.input';
import { EmailCreateInput } from '../inputs/email.input';
import { PersonCreateInput, PersonUpdateInput } from '../inputs/person.input';
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

  /**
   * Создание нового пользователя
   * @param input PersonCreateInput
   */
  async create(input: PersonCreateInput): Promise<PersonEntity> {
    return await this.personRepository.save({ ...input });
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
    await this.cardRepository.save(card);
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
    await this.clientRepository.save(account);
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
