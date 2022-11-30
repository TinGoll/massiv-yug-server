import { Edge } from "./edge";

export class Vertex<T extends any = any> {
  edges: Edge<T>[] = [];
  constructor(readonly id: T) {}
  addEdhe(vertex: Vertex<T>, weight: number = 1): this {
    if (!this.edges.find((e) => e.vertexId === vertex.id)) {
      this.edges.push(new Edge<T>(vertex.id, weight));
    }
    return this;
  }
}
