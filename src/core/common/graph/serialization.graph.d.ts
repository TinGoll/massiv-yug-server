declare module SerializationOrderGraph {
  interface Edge {
    vertexId: string;
    weight: number;
  }
  interface Strategy {
    vertexId: string;
    complited: boolean;
  }

  interface WorkData {
    workId: number;
  }

  interface Options {
    name: string;
    strategy: Strategy[];
    workData: WorkData[];
    startVertex: boolean;
    endVertex?: boolean;
  }

  interface Vertex {
    id: string;
    edges: Edge[];
    options: Options;
  }

  interface Graph {
    vertices: Vertex[];
    isBuilt: boolean;
  }
}

export default SerializationOrderGraph;
