import nanoid from '../nanoid';
import { Edge } from './edge';
import { Vertex } from './vertex';

export class OrderVertex<G extends any = any> extends Vertex<string> {
  constructor(readonly options: G, currentId?: string) {
    const id = currentId || nanoid();
    super(id);
  }

  getOptions(): G {
    return this.options;
  }

  /**
   * Создание вершины из json объекта базы данных
   * @param options опции вершины.
   * @param edges ребра вершины.
   */
  public static deSerialization<G extends any = any>(
    currentId: string,
    options: G,
    ...edges: Edge[]
  ): OrderVertex<G> {
    const vertex = new OrderVertex<G>(options, currentId);
    vertex.edges = edges.map((e) => new Edge(e.vertexId, e.weight));
    return vertex;
  }
}
