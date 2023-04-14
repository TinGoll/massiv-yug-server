import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PersonEntity } from './person.entity';

/** Аккаунт клиента. */
@Entity('person_cards')
export class PersonCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  number: string;

  @Column('varchar', { nullable: true })
  cardHolder: string;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({
    name: 'personId',
  })
  person: Promise<PersonEntity> | PersonEntity;
}
