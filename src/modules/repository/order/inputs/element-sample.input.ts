import { ComponentKey } from 'src/modules/ecs/services/component-mapper';
import { ElementSampleBody } from '../entities/sample-element.entity';

export class ElementSampleCreateInput {
  name: string;
  components: ComponentKey[];
  body: ElementSampleBody[];
}

export class ElementSampleUpdateInput {
  id: number;
  name?: string;
  components?: ComponentKey[];
  body?: ElementSampleBody[];
}
