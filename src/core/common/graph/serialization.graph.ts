import { MYEntity } from 'src/core/ecs/engine/my-entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { SampleElementEntity } from 'src/modules/repository/order/entities/element.entity';
import { Geometry } from '../models/geometry';
import { QueueCollection } from '../queue-collection/QueueCollection';
import { WorkData } from 'src/core/@types/app.types';

declare module SerializationOrderGraph {
  export interface Edge {
    vertexId: string;
    weight: number;
  }
  export interface Strategy {
    vertexId: string;
    complited: boolean;
  }

  export interface WorkId {
    workId: number;
  }

  export interface Options {
    name: string;
    strategy: Strategy[];
    workData: WorkId[];
    startVertex: boolean;
    endVertex?: boolean;
  }

  export interface Vertex {
    id: string;
    edges: Edge[];
    options: Options;
  }

  export interface Graph {
    vertices: Vertex[];
    blanks: QueueBlank[];
    isBuilt: boolean;
  }

  interface QueueWork {
    name: string;
    type: string;
    geometry: Geometry;
    data: WorkData & { id: number };
  }

  export interface EntityQueues {
    entity: MYEntity;
    sample: SampleElementEntity;
    queue: QueueCollection<QueueWork>;
  }

  export interface QueueDocument
    extends Partial<
      Omit<
        DocumentEntity,
        | 'createdAt'
        | 'updatedAt'
        | 'deleted'
        | 'cost'
        | 'resultData'
        | 'elements'
        | 'book'
      >
    > {
    id: number;
    queueList: QueueWork[];
  }

  export interface QueueBlank {
    /** Наименование бланка */
    name: string;
    /** Id участка */
    sectorId: number;
    /** ID Узла графа */
    nodeId: string;
    /** Поля документа, которые нужны для этого бланка. */
    fields?: Partial<Record<keyof DocumentEntity, boolean>>;
    /** Массив содержащий поля документа и список работ с данными. */
    queueDocuments: QueueDocument[];
  }
}

export default SerializationOrderGraph;
