import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity('document_element')
export class ElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Книга документа */
  @ManyToOne(() => DocumentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'documentId',
  })
  document: DocumentEntity;

  /******************************************** */
  /********* Подключение компонентов ********** */
  /******************************************** */

  /******************************************** */
}
