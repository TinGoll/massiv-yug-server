import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PersonAddress } from './entities/person.address.entity';
import { PersonBankAccount } from './entities/person.bank.account.entity';
import { PersonCard } from './entities/person.card.entity';
import { ClientAccount } from './entities/person.client.account.entity';
import { PersonEmail } from './entities/person.email.entity';
import { PersonEntity } from './entities/person.entity';
import { PersonPhone } from './entities/person.phone.entity';
import { UserAccount } from './entities/person.user.account.entity';
import { AddressCreateInput } from './inputs/address.input';
import { BankCreateInput } from './inputs/bank.input';
import { CardCreateInput } from './inputs/card.input';
import {
  ClientAccountCreateInput,
  ClientAccountUpdateInput,
} from './inputs/client-account.input';
import { EmailCreateInput } from './inputs/email.input';
import { PersonCreateInput, PersonUpdateInput } from './inputs/person.input';
import { PhoneCreateInput } from './inputs/phone.input';
import {
  UserAccountCreateInput,
  UserAccountUpdateInput,
} from './inputs/user-account.input';

export interface PersonRelations {
  address?: boolean;
  bank?: boolean;
  card?: boolean;
  client?: boolean;
  email?: boolean;
  phone?: boolean;
  user?: boolean;
}

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
    @InjectRepository(UserAccount)
    private readonly userRepository: Repository<UserAccount>,
    @InjectRepository(ClientAccount)
    private readonly clientRepository: Repository<ClientAccount>,
  ) {}

  async create(input: PersonCreateInput): Promise<PersonEntity> {
    const entity = this.new(input);
    return await this.save(entity);
  }
  async save(entity: PersonEntity): Promise<PersonEntity> {
    return await this.personRepository.save(entity);
  }
  async update(input: PersonUpdateInput): Promise<PersonEntity> {
    await this.personRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }
  async remove(id: number): Promise<number> {
    await this.personRepository.update({ id }, { deleted: true });
    return id;
  }
  new(input: PersonCreateInput): PersonEntity {
    return this.personRepository.create({ ...input });
  }

  async addAddress(
    personId: number,
    input: AddressCreateInput,
  ): Promise<PersonAddress> {
    const person = await this.findToId(personId, { address: true });
    if (!person.addresses) person.addresses = [];
    const entity = this.addressRepository.create({ ...input });
    await this.addressRepository.save(entity);
    person.addresses.push(entity);
    await this.personRepository.save(person);
    return entity;
  }
  async removeAddress(id: number): Promise<number> {
    await this.addressRepository.delete(id);
    return id;
  }

  async addBank(
    personId: number,
    input: BankCreateInput,
  ): Promise<PersonBankAccount> {
    const person = await this.findToId(personId, { bank: true });
    if (!person.bankAccounts) person.bankAccounts = [];
    const entity = this.bankRepository.create({ ...input });
    await this.bankRepository.save(entity);
    person.bankAccounts.push(entity);
    await this.personRepository.save(person);
    return entity;
  }
  async removeBank(id: number): Promise<number> {
    await this.bankRepository.delete(id);
    return id;
  }

  async addCards(
    personId: number,
    input: CardCreateInput,
  ): Promise<PersonCard> {
    const person = await this.findToId(personId, { card: true });
    if (!person.cards) person.cards = [];
    const entity = this.cardRepository.create({ ...input });
    await this.cardRepository.save(entity);
    person.cards.push(entity);
    await this.personRepository.save(person);
    return entity;
  }
  async removeCards(id: number): Promise<number> {
    await this.cardRepository.delete(id);
    return id;
  }

  async addEmail(
    personId: number,
    input: EmailCreateInput,
  ): Promise<PersonEmail> {
    const person = await this.findToId(personId, { email: true });
    if (!person.emails) person.emails = [];
    const entity = this.emailRepository.create({ ...input });
    await this.emailRepository.save(entity);
    person.emails.push(entity);
    await this.personRepository.save(person);
    return entity;
  }
  async removeEmail(id: number): Promise<number> {
    await this.emailRepository.delete(id);
    return id;
  }

  async addPhone(
    personId: number,
    input: PhoneCreateInput,
  ): Promise<PersonPhone> {
    const person = await this.findToId(personId, { phone: true });
    if (!person.phones) person.phones = [];
    const entity = this.phoneRepository.create({ ...input });
    await this.phoneRepository.save(entity);
    person.phones.push(entity);
    await this.personRepository.save(person);
    return entity;
  }
  async removePhone(id: number): Promise<number> {
    await this.personRepository.delete(id);
    return id;
  }

  async createClientAccount(
    personId: number,
    input: ClientAccountCreateInput,
  ): Promise<ClientAccount> {
    const person = await this.findToId(personId, {
      client: true,
    });
    if (!person || person.clientAccount) {
      throw new Error('Ошибка создания аккаунта');
    }
    const account = this.clientRepository.create({ ...input });
    await this.clientRepository.save(account);
    person.clientAccount = account;
    await this.personRepository.save(person);
    return account;
  }
  async updateClientAccount(
    input: ClientAccountUpdateInput,
  ): Promise<ClientAccount> {
    await this.clientRepository.update({ id: input.id }, { ...input });
    return await this.clientRepository.findOne({ where: { id: input.id } });
  }
  async removeClientAccount(id: number): Promise<number> {
    await this.clientRepository.delete(id);
    return id;
  }

  async createUserAccount(
    personId: number,
    input: UserAccountCreateInput,
  ): Promise<UserAccount> {
    const person = await this.findToId(personId, {
      user: true,
    });
    if (!person || person.userAccount) {
      throw new Error('Ошибка создания аккаунта');
    }
    const account = this.userRepository.create({ ...input });
    await this.userRepository.save(account);
    person.userAccount = account;
    await this.personRepository.save(person);
    return account;
  }
  async updateUserAccount(input: UserAccountUpdateInput): Promise<UserAccount> {
    await this.userRepository.update({ id: input.id }, { ...input });
    return await this.userRepository.findOne({ where: { id: input.id } });
  }
  async removeUserAccount(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id;
  }

  // find

  async findToId(
    id: number,
    relations: PersonRelations = {},
  ): Promise<PersonEntity | null> {
    return await this.personRepository.findOne({
      where: { id },
      relations: {
        addresses: relations.address,
        bankAccounts: relations.bank,
        cards: relations.card,
        emails: relations.email,
        phones: relations.phone,
        userAccount: relations.user,
        clientAccount: relations.client,
      },
    });
  }

  async findToLogin(
    login: string,
    relations: PersonRelations = {},
  ): Promise<PersonEntity> {
    return await this.personRepository.findOne({
      relations: {
        addresses: relations.address,
        bankAccounts: relations.bank,
        cards: relations.card,
        clientAccount: relations.client,
        emails: relations.email,
        phones: relations.phone,
        userAccount: true,
      },
      where: {
        userAccount: {
          login: Like(`%${login}#%`),
        },
      },
    });
  }

  async findAll(relations: PersonRelations = {}): Promise<PersonEntity[]> {
    return await this.personRepository.find({
      relations: {
        addresses: relations.address,
        bankAccounts: relations.bank,
        cards: relations.card,
        clientAccount: relations.client,
        emails: relations.email,
        phones: relations.phone,
        userAccount: relations.user,
      },
    });
  }
}
