import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';

export enum PayType {
  CARD = 'Карта',
  ACCOUNT = 'Счет',
  CASH = 'Наличные',
}

export interface ClientExtraData {
  profiler?: boolean;
  prepaid?: boolean;
}

/** Аккаунт клиента. */
@Entity('person_client_account')
export class ClientAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  alternativeName: string;

  @Column({ type: 'varchar', length: 128 })
  companyName: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  comment?: string;

  @Column({ type: 'int', nullable: true })
  managerId?: number;

  @Column({
    type: 'enum',
    enum: PayType,
    default: PayType.CASH,
    nullable: true,
  })
  payType?: PayType;

  @Column({ type: 'varchar', length: 128, nullable: true })
  webSite?: string;

  @Column({ type: 'jsonb', default: {} })
  extraData: ClientExtraData;

  @OneToOne(() => PersonEntity, (person) => person.clientAccount, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'personId' })
  person: Promise<PersonEntity> | PersonEntity;
}
