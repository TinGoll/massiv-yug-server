import { WorkComponentData, WorkElementData } from 'src/core/@types/app.types';
import { Edge } from './edge';
import { Graph } from './graph';
import { OrderVertex } from './order-vertex';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import SerializationOrderGraph from './serialization.graph';

interface Strategy {
  vertexId: string | number;
  complited: boolean;
}

export interface VertexOptions {
  name: string;
  workData: WorkElementData[];
  sectorid?: number;
  startVertex?: boolean;
  endVertex?: boolean;
  strategy: Strategy[];
  takeOne?: boolean;
  fields?: Partial<Record<keyof DocumentEntity, boolean>>;
}

export class OrderGraph extends Graph<string> {
  public isBuilt: boolean = false;
  public blanks;
  constructor(vertex: OrderVertex[] = []) {
    super(vertex);
  }
  getVertices(): OrderVertex<VertexOptions>[] {
    return <OrderVertex[]>this.vertices;
  }
  // Создание новой вершины.
  add(options: VertexOptions): OrderVertex {
    const vertex = new OrderVertex<VertexOptions>(options);
    // if (!this.vertices.length) vertex.options.startVertex = true;
    return <OrderVertex>super.addVertex(vertex);
  }

  addVertex(vertex: OrderVertex): OrderVertex | null {
    return <OrderVertex>super.addVertex(vertex);
  }

  addEdge(
    vertexA: OrderVertex,
    vertexB: OrderVertex,
    weight: number = 1,
  ): void {
    return super.addEdge(vertexA, vertexB, weight);
  }

  getStartVertex(): OrderVertex<VertexOptions> | null {
    return (
      this.getVertices().find((n) => {
        return n.options.startVertex;
      }) || null
    );
  }

  getVertexToId(id: string): OrderVertex<VertexOptions> | null {
    return this.getVertices().find((v) => v.id === id) || null;
  }

  /** Поиск в ширину, не используется*/
  BFS(
    callback: (
      nodeA: OrderVertex<VertexOptions>,
      nodeB: OrderVertex<VertexOptions>,
      edge: Edge,
      vertices: OrderVertex<VertexOptions>[],
    ) => void,
  ) {
    const vertices = this.getVertices();
    const startNode = this.getStartVertex();
    const endNode = this.getVertices().find((n) => {
      return n.options.endVertex;
    });
    if (!startNode || !endNode) return false;

    const visited: Record<string, boolean> = {};
    // Добавляем в очередь стартовую ноду
    const queue: OrderVertex<VertexOptions>[] = [startNode];
    // Делаем посещенной
    visited[startNode.id] = true;

    while (queue.length) {
      let current = queue.shift();

      for (const neighbor of current?.edges || []) {
        if (!visited[neighbor.vertexId]) {
          const node = vertices.find((v) => v.id === neighbor.vertexId);
          if (node) {
            queue.push(node);
            visited[neighbor.vertexId] = true;
            if (typeof callback === 'function') {
              callback(current!, node, neighbor, vertices);
            }
            if (node === endNode) return true;
          }
        }
      }
    }
    return false;
  }
  /** Обход в ширину */
  roundBfs(
    callback: (
      nodeA: OrderVertex<VertexOptions>,
      nodeB: OrderVertex<VertexOptions> | null,
      edge: Edge | null,
      vertices: OrderVertex<VertexOptions>[],
    ) => void,
  ) {
    const vertices = this.getVertices();
    const startNode = this.getStartVertex();
    if (!startNode) return false;
    const queue: OrderVertex<VertexOptions>[] = [startNode];

    const buldData: Map<
      string,
      Array<{ id: string; complit: boolean }>
    > = new Map<string, Array<{ id: string; complit: boolean }>>();

    this.round((a, b, e) => {
      if (a && b) {
        if (a === startNode) {
          buldData.set(a.id, []);
        }
        if (!buldData.has(b.id)) {
          buldData.set(b.id, []);
        }
        buldData.get(b.id)!.push({ id: a.id, complit: false });
      }
    });

    while (queue.length) {
      const current = queue.shift();
      if (!current) return false;
      let currentComplited = true;

      for (const cml of buldData.get(current.id) || []) {
        if (!cml.complit) {
          currentComplited = false;
          break;
        }
      }

      if (!currentComplited && !queue.length) return false;

      if (!currentComplited) {
        if (!queue.includes(current)) queue.push(current);
        continue;
      }

      for (const edge of current.edges || []) {
        const node = this.getVertexToId(edge.vertexId);
        if (node) {
          const bd = buldData.get(node.id)?.find((b) => b.id === current.id);
          if (bd) {
            bd.complit = true;
          } else {
            // Ошибка
            console.log('Ошибка, нет ссылки');
            return false;
          }
          if (!queue.includes(node)) queue.push(node);
          callback(current, node, edge, vertices);
        }
      }
      if (!current.edges.length) {
        callback(current, null, null, vertices);
      }
    }
  }
  /** Обход по всем вершинам, быстрый метод */
  round(
    callback: (
      nodeA: OrderVertex<VertexOptions>,
      nodeB: OrderVertex<VertexOptions> | null,
      edge: Edge | null,
      vertices: OrderVertex<VertexOptions>[],
    ) => void,
  ) {
    const vertices = this.getVertices();
    for (const nodeA of vertices) {
      for (const edge of nodeA.edges) {
        const nodeB = vertices.find((v) => v.id === edge.vertexId)!;
        if (typeof callback === 'function') {
          callback(nodeA, nodeB, edge, vertices);
        }
      }

      if (!nodeA.edges.length) {
        callback(nodeA, null, null, vertices);
      }
    }
    return true;
  }
  /** Очередность графа */
  queue<G extends any = any>(
    callback: (node: OrderVertex<VertexOptions>) => G,
  ): G[] {
    const tempArr: G[] = [];
    const queueArr: OrderVertex<VertexOptions>[] = [];
    this.roundBfs((a, b) => {
      if (!queueArr.includes(a)) queueArr.push(a);
    });
    for (let index = 0; index < queueArr.length; index++) {
      const item = queueArr[index];
      tempArr.push(callback(item));
    }
    return tempArr;
  }

  /** Сборка графа */
  build() {
    this.isBuilt = true;
    return this.round((a, b, e, arr) => {
      if (b?.options?.strategy) {
        // console.log("\x1b[33m%s\x1b[0m", a.options.name, ">>>", b.options.name);
        b?.options.strategy.push({ vertexId: a.id, complited: false });
      }
    });
  }

  serialization(): SerializationOrderGraph.Graph {
    return <SerializationOrderGraph.Graph>JSON.parse(JSON.stringify(this));
  }

  /**
   * Создание графа из json объекта базы данных.
   * @param object
   * @returns OrderGraph
   */
  public static deSerialization(
    object: SerializationOrderGraph.Graph,
  ): OrderGraph {
    const vertices = object.vertices.map((v) =>
      OrderVertex.deSerialization<VertexOptions>(v.id, v.options, ...v.edges),
    );
    const graph = new OrderGraph(vertices);
    graph.isBuilt = object.isBuilt;
    graph.blanks = object.blanks;
    return graph;
  }
}
