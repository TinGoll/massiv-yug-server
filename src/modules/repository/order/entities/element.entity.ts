
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ComponentKey = ""


interface ComponentData {
  /** Название компонента */
  componentName: ComponentKey;
  /** Обеъект с полями компонента. */
  default: object;
}

export interface ElementSampleBody {
  /**
   * Идентификатор (название номенклатуры в списке) номенклатуры.
   * Может иметь массив данные по умолчанию, для сомпонентов
   */
  identifier: string;
  /**
   * Данные для компонентов по умолчанию.
   * Если такой компонент добавлен в список компонентов,
   * то к нему будет применен набор свойств по умолчанию.
   */
  componentData: Array<ComponentData>;
}

/** Шаблон для сущности */
@Entity('element_sample')
export class SampleElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Название сущности */
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  default: Array<ComponentData>;

  @Column({ type: 'jsonb', default: [] })
  components: ComponentKey[];

  @Column({ type: 'jsonb', default: [] })
  body: ElementSampleBody[];
}
