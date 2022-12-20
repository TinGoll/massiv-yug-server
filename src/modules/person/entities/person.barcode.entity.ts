import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('person_barcode')
export class PersonBarcodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  barcode: string;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
    lazy: true
  })
  @JoinColumn({
    name: 'personId',
  })
  person: Promise<PersonEntity>;
}
