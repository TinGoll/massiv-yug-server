import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { PersonEntity } from './person.entity';
  
  /** Аккаунт клиента. */
  @Entity('person_bank_account')
  export class PersonBankAccount {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    /******************************************* */
    /********* Данные расчетного счета ********* */
  
    /** Название компании */
    @Column({ type: 'varchar', length: 256, nullable: true })
    companyName?: string;
    /** ИНН */
    @Column({ type: 'varchar', length: 256, nullable: true })
    inn?: string;
    /** Юридический адрес */
    @Column({ type: 'varchar', length: 256, nullable: true })
    legalAddress?: string;
    /** Кореспонденский счет. */
    @Column({ type: 'varchar', length: 256, nullable: true })
    correspondentAccount?: string;
    /** Расчетный счет */
    @Column({ type: 'varchar', length: 256, nullable: true })
    checkingAccount?: string;
    /** Банк */
    @Column({ type: 'varchar', length: 256, nullable: true })
    bank?: string;
    /** Бик */
    @Column({ type: 'varchar', length: 128, nullable: true })
    bik?: string;
  
    /******************************************* */
  
    @ManyToOne(() => PersonEntity, {
      onDelete: 'CASCADE',
      lazy: true
    })
    @JoinColumn({
      name: 'personId',
    })
    person: Promise<PersonEntity> | PersonEntity;
  
  }