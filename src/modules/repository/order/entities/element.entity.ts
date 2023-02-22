import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const componentKeys = [
  'component_geometry',
  'component_works',
  'component_panel',
  'component_profile',
] as const;
export type ComponentKey = typeof componentKeys[number];

export interface ComponentDefaultData {
  /** Название компонента */
  componentName: ComponentKey;
  /** Обеъект с полями компонента. */
  data: object | null;
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
  componentData: Array<ComponentDefaultData>;
}

/** Шаблон для сущности */
@Entity('sample_element')
export class SampleElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  index: number;

  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Название сущности */
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  /**
   * Поле, содержит только названия компонентов.
   * Наличие ключа компонента в этом поле, говорит о том, что
   * компонент присутвует в данном элементе,
   * однако, может быть "выключен" с помощью переопределения.
   */
  components: ComponentKey[];

  @Column({ type: 'jsonb', default: [] })
  /**
   * Поле состоит из массива ключей компонента и данных компонента по умолчанию.
   * Пустой объект в данном случае, обозначает, что компонент не модифицируется
   * null - компонент выключен, для данного элемента
   */
  default: Array<ComponentDefaultData>;

  @Column({ type: 'jsonb', default: [] })
  body: ElementSampleBody[];

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;
}
