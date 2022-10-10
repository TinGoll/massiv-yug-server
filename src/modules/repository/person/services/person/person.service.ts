import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ClientAccount } from '../../entities/client-account.entity';
import {

  PersonEntity,
  PersonRole,
} from '../../entities/person.entity';
import { UserAccount } from '../../entities/user-account.entity';
import { PersonClientAccountCreateInput, PersonCreateInput, PersonUserAccountCreateInput } from '../../inputs/person-create.input';
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
  ) {}

  /** Создание нового person */
  async createPerson(input: PersonCreateInput): Promise<PersonEntity> {
    try {
      const person = await this.personRepository.save({ ...input });
      return person;
    } catch (e) {
      new WsException(e);
    }
  }
  /** Создание нового клиент - аккаунта person */
  async createClientAccount(
    input: PersonClientAccountCreateInput,
  ): Promise<ClientAccount> {
    try {
      const { personId } = input;
      const person = await this.find(personId);
      if (person.clientAccount)
        throw new WsException('Для этого человека, уже создан аккаунт клиента');
      const account = new ClientAccount();
      account.clients.push(person);
      const savedAcc = await this.clientAccountRepository.save(account);
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
      const account = new UserAccount();
      account.user = person;
      account.userRoles.push(...userRoles);
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
  async updateClientAccount(input: any): Promise<ClientAccount| void> {
    try {
        throw new WsException("Функция не реализована")

    } catch (e) {
      new WsException(e);
    }
  }
  /** Обновление юзер - аккаунта person */
  async updateUserAccount(input: any): Promise<UserAccount| void> {
    try {
        throw new WsException('Функция не реализована');
    } catch (e) {
      new WsException(e);
    }
  }

  /** Удаление  person */
  async deletePerson(id: number): Promise<number> {
    try {
        await this.personRepository.update({id}, { deleted: true })
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
        return await this.personRepository.findOne({where: { id }})
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
              personRoles: r
            })),
          ],
        });
    } catch (e) {
      new WsException(e);
    }
  }
}
