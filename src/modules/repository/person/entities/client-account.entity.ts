import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonEntity } from './person.entity';

/** Аккаунт клиента. */
@Entity('client_account')
export class ClientAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PersonEntity, (photo) => photo.clientAccount)
  clients: PersonEntity[];
}
