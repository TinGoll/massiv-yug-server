import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { ElementEntity } from '../order/entities/document-element.entity';

@Entity('component_geometry')
export class GeometryComponentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Высота */
  @Column({ type: 'numeric' })
  height: number;
  /** Ширина */
  @Column({ type: 'numeric' })
  width: number;
  /** Глубина */
  @Column({ type: 'numeric' })
  depth: number;
  /** количество */
  @Column({ type: 'numeric' })
  amount: number;

  /** площадь */
  @Column({ type: 'numeric' })
  square: number;
  /** кубатура */
  @Column({ type: 'numeric' })
  cubature: number;
  /** погонные метры */
  @Column({ type: 'numeric' })
  linearMeters: number;
  /** Периметр */
  @Column({ type: 'numeric' })
  perimeter: number;

  /** Елемент, сущность документа */
  @OneToOne(() => ElementEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'elementId' })
  element: ElementEntity;
}
