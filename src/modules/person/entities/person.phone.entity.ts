import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PersonEntity } from './person.entity';

/** Аккаунт клиента. */
@Entity('person_phones')
export class PersonPhone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  number: string;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({
    name: 'personId',
  })
  person: Promise<PersonEntity> | PersonEntity;
}
