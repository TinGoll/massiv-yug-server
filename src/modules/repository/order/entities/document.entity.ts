import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { DocumentColorEntity } from '../../finishing/document-color/entities/document-color.entity';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => DocumentColorEntity, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'colorId',
  })
  color: DocumentColorEntity;

  /**
   *
   * glossiness: 'Глубоко матовый (10%)', 'Матовый (20%)', 'Лёгкий глянец (40%)', 'Глянец (70%)', 'Сильный глянец (90%)'
   */
}
