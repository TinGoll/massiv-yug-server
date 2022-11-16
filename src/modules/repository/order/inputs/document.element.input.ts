import {
  ComponentData,
  ComponentKey,
  ElementSampleBody,
} from '../entities/element.entity';

export class DocumentElementCreateInput {
  /** Название сущности */
  name: string;
  default?: Array<ComponentData>;
  components?: ComponentKey[];
  body?: ElementSampleBody[];
}
export class DocumentElementUpdateInput {
  id: number;
  /** Название сущности */
  name?: string;
  default?: Array<ComponentData>;
  components?: ComponentKey[];
  body?: ElementSampleBody[];
}
