import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { PersonEntity } from './person.entity';
  
  /** Аккаунт клиента. */
  @Entity('person_addresses')
  export class PersonAddress {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 64, nullable: true })
    city?: string;
    @Column({ type: 'varchar', length: 64, nullable: true })
    street?: string;
    @Column({ type: 'varchar', length: 64, nullable: true })
    house?: string;
    @Column({ type: 'varchar', length: 64, nullable: true })
    apartment?: string;
    @Column({ type: 'varchar', length: 32, nullable: true })
    postIndex?: string;
  
    @ManyToOne(() => PersonEntity, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({
      name: 'personId',
    })
    person: PersonEntity;
  }