import { Vertex } from "./vertex";
export class Graph<T extends any = any> {
  constructor(protected readonly vertices: Vertex<T>[] = []) {}

  addVertex(vertex: Vertex<T>): Vertex<T> | null {
    if (!this.vertices.find((v) => v.id === vertex.id)) {
      this.vertices.push(vertex);
      return vertex;
    }
    return null;
  }
  addEdge(vertexA: Vertex<T>, vertexB: Vertex<T>, weight: number = 1): void {
    vertexA.addEdhe(vertexB, weight);
  }
}
