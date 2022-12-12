import { Injectable } from '@nestjs/common';
import { OrderGraph } from 'src/core/common/graph/order-graph';

@Injectable()
export class GraphProvider {
  constructor() {}

  /** Генерирует новый Order - граф. */
  createOrderGraph() {
    const graph = new OrderGraph();

    // Граф формируется, согласно схеме движения заказов.

    // Узел офис, является стартовой вершиной.
    const vertex1 = graph.add({
      name: 'Офис',
      strategy: [],
      workData: [],
      startVertex: true,
    });

    const vertex2 = graph.add({
      name: 'Раскрой Шпона',
      workData: [{ workId: 3 }],
      strategy: [],
    });
    const vertex3 = graph.add({
      name: 'Раскрой листовых материалов',
      workData: [{ workId: 1 }],
      strategy: [],
    });
    const vertex4 = graph.add({
      name: 'Склейка на мембранном прессе',
      workData: [{ workId: 5 }],
      strategy: [],
    });
    const vertex5 = graph.add({
      name: 'Фрезеровка на большом фрезере',
      workData: [{ workId: 2 }],
      strategy: [],
    });
    const vertex6 = graph.add({
      name: 'Шлифовка на шлифовальных центрах',
      workData: [{ workId: 7 }],
      strategy: [],
    });
    const vertex7 = graph.add({
      name: 'Подбор профиля',
      workData: [{ workId: 8 }],
      strategy: [],
    });

    const vertex8 = graph.add({
      name: 'Запил',
      workData: [{ workId: 9 }],
      strategy: [],
    });

    const vertex9 = graph.add({
      name: 'Мастер Джон',
      workData: [{ workId: 10 }],
      strategy: [],
    });

    const vertex10 = graph.add({
      name: 'Вайма',
      workData: [{ workId: 12 }],
      strategy: [],
    });

    const vertex11 = graph.add({
      name: 'Пятый',
      workData: [{ workId: 11 }],
      strategy: [],
    });

    const vertex12 = graph.add({
      name: 'Шлифовка',
      workData: [{ workId: 6 }],
      strategy: [],
      endVertex: true,
    });

    // Офис => Раскрой Шпона
    graph.addEdge(vertex1, vertex2);
    // Офис => Раскрой листовых материалов
    graph.addEdge(vertex1, vertex3);
    // Офис => Подбор профиля
    graph.addEdge(vertex1, vertex7);

    // Раскрой Шпона => Запил
    graph.addEdge(vertex2, vertex8);
    // Раскрой листовых материалов => Запил
    graph.addEdge(vertex3, vertex8);
    // Подбор профиля => Запил
    graph.addEdge(vertex7, vertex8);

    // Запил => Мастер Джон
    graph.addEdge(vertex8, vertex9);
    // Мастер Джон => Вайма
    graph.addEdge(vertex9, vertex10);
    // Вайма => Пятый
    graph.addEdge(vertex10, vertex11);

    // Пятый => Шлифовка
    graph.addEdge(vertex11, vertex12);

    graph.build();
    return graph;
  }
}
