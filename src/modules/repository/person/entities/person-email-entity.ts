import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PersonEntity } from './person.entity';

/** Аккаунт клиента. */
@Entity('person_emails')
export class PersonEmail {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'personId',
  })
  person: PersonEntity;
  /**  */
  personId?: number;

  
}
