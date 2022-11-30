export class Edge<T extends any = any> {
  weight: number;
  constructor(readonly vertexId: T, weight: number = 1) {
    this.weight = weight;
  }
}
