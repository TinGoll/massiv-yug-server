import { WsException } from '@nestjs/websockets';
import {
  AssignColorOptions,
  AssignPanelOptions,
  AssignPatinaOptions,
  AssignProfileOptions,
  AssignVarnishOptions,
  DocumentOptions,
  ElementOptions,
} from 'src/core/@types/app.types';
import { IComponent } from 'src/core/ecs/components/component-interface';
import { MYEngine } from 'src/core/ecs/engine/my-engine';
import { MYEntity } from 'src/core/ecs/engine/my-entity';
import { GeometrySystem } from 'src/core/ecs/systems/geometry.system';
import { NestedWorkSystem } from 'src/core/ecs/systems/nested.works.system';
import { OrderGraphSystem } from 'src/core/ecs/systems/order.graph.system';
import { PanelSystem } from 'src/core/ecs/systems/panel.system';
import { PresentationSystem } from 'src/core/ecs/systems/presentation.system';
import { ProfileSystem } from 'src/core/ecs/systems/profile.system';
import { ResultSystem } from 'src/core/ecs/systems/result.system';
import { WorkSystem } from 'src/core/ecs/systems/work.system';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { ElementEntity } from 'src/modules/repository/order/entities/document.element.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { BookUpdateInput } from 'src/modules/repository/order/inputs/book.input';
import { Component, Entity } from 'yug-entity-component-system';
import { ComponentMapper } from '../../providers/component-mapper';
import { OrderCreator } from '../../providers/order-creator';
import Processing from '../actions/processing-actions';
import {
  RoomEventListener,
  RoomEventStateListener,
  UnsubscribeFunction,
} from '../interfaces';
import { RoomManager } from '../room-manager';

interface MultipleEvent {
  [key: string | symbol]: Array<(...args: any[]) => void>;
}

export class Room {
  public readonly id: number | string;
  private engine: MYEngine;
  private orderCreator: OrderCreator;
  private multipleEvents: MultipleEvent = {};

  constructor(
    public readonly roomManager: RoomManager,
    public readonly book: BookEntity,
    public readonly componentMapper: ComponentMapper,
  ) {
    this.id = book.id;
    this.engine = new MYEngine(book, this);
    this.orderCreator = roomManager.orderCreator;
  }

  async assignClient(person: PersonEntity): Promise<BookEntity> {
    return await this.orderCreator.assignClient(this.book, person);
  }

  /** Добавить документ в комнату */
  async addDocument(options?: DocumentOptions): Promise<DocumentEntity> {
    return await this.orderCreator.addDocument(this.book, options);
  }

  /** Добавить документ в комнату */
  async addElement(
    documentId: number,
    identifier: string,
    options?: ElementOptions,
  ): Promise<void> {
    const document = (this.book.documents || []).find(
      (d) => d.id === documentId,
    );
    if (document) {
      throw new WsException('Документ не найден.');
    }
    const element = await this.orderCreator.addElement(
      document.id,
      identifier,
      options,
    );
    this.addElementToEngine(element, document, this.book);
  }

  /**
   * Метод для изменения компонентов сущности (Entity)
   * @param elementId id елемента
   * @param componentKey ключ комопнента
   * @param data данные
   */
  async changeComponent<T extends object = object>(
    elementId: number,
    componentKey: ComponentKey,
    data: Partial<T>,
  ): Promise<void> {
    // Находим сущность по id
    const entity = this.engine
      .getEntities()
      .toArray()
      .find((e) => e.id === elementId);
    // Если сущность не найдена, завершаем с ошибкой.
    if (!entity) {
      throw new WsException('Сущность не найдена.');
    }

    // Получаем компонент по ключу.
    const cmp = entity.getComponent<Component & IComponent<object>>(
      this.componentMapper.get(componentKey),
    );
    // Если компонента нет, завершаем с ошибкой.
    if (!cmp) {
      throw new WsException(
        `Компонент ${componentKey} не найден в даной сущности.`,
      );
    }
    // Изменяем данные компонента. путем развертывания.
    cmp.data = { ...cmp.data, ...data };
    // await this.orderCreator.changeComponent<T>(elementId, componentKey, data);
  }

  /**
   * Основной метод изменения заказа.
   * @param authorId id автора события.
   * @param action объект - событие.
   */
  async act(author: PersonEntity, action: Processing.Action): Promise<void> {
    switch (action.event) {
      // Событие добавления элемента в документ
      case 'update-book':
        const updateBookAction = <Processing.UpdateBook<BookUpdateInput>>action;
        await this.orderCreator.updateBook(this.book, updateBookAction.input);
        console.log(this.book);
        
        break;
      case 'assign-book-client':
        const assignClientAction = <Processing.AssignBookClient<PersonEntity>>(
          action
        );
        await this.assignClient(assignClientAction.client);
        break;
      case 'add-element':
        const addElementAction = <Processing.AddElementAction>action;
        await this.addElement(
          addElementAction.documentId,
          addElementAction.identifier,
          addElementAction.options,
        );
        break;
      // Изменение компонента сущности.
      case 'change-component':
        const changeComponentAction = <Processing.ChangeComponentAction>action;
        await this.changeComponent(
          changeComponentAction.elementId,
          changeComponentAction.componentKey,
          changeComponentAction.data,
        );
        break;
      // Присвоить цвет документа
      case 'assign-document-color':
        const actionDocumentColor = <
          Processing.AssignDocumentColor<AssignColorOptions>
        >action;
        await this.orderCreator.assignColor(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
          actionDocumentColor.options,
        );
        break;
      // Присвоить патину документа
      case 'assign-document-patina':
        const actionDocumentPatina = <
          Processing.AssignDocumentPatina<AssignPatinaOptions>
        >action;
        await this.orderCreator.assignPatina(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
          actionDocumentColor.options,
        );
        break;
      // Присвоить лак документа
      case 'assign-document-varnish':
        const actionDocumentVarnish = <
          Processing.AssignDocumentVarnish<AssignVarnishOptions>
        >action;
        await this.orderCreator.assignVarnish(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
          actionDocumentColor.options,
        );
        break;
      // Присвоить материал документа
      case 'assign-document-material':
        const actionDocumentMaterial = <Processing.AssignDocumentMaterial>(
          action
        );
        await this.orderCreator.assignMaterial(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
        );
        break;
      // Присвоить профиль документа
      case 'assign-document-profile':
        const actionDocumentProfile = <
          Processing.AssignDocumentProfile<AssignProfileOptions>
        >action;
        await this.orderCreator.assignProfile(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
          actionDocumentColor.options,
        );
        break;
      // Присвоить филёнку документа
      case 'assign-document-panel':
        const actionDocumentPanel = <
          Processing.AssignDocumentPanel<AssignPanelOptions>
        >action;
        await this.orderCreator.assignPanel(
          actionDocumentColor.documentId,
          actionDocumentColor.assignedName,
          actionDocumentColor.options,
        );
        break;
      default:
        break;
    }
  }

  // *************************************************
  /**
   * Функция обновления комнаты.
   * @param dt время прошедшее между тактами.
   * В случае управления по событию, dt будет 0.
   */
  async update(dt: number): Promise<void> {
    await this.engine.update(dt);
    this.roomManager.stop();
    console.log('update: ' + this.id);

    // УБРАТЬ
    await this.state();
  }

  /** Вызывается после создания команты. Переопределите, что бы использовать в своих целях. */
  async afterCreation(): Promise<void> {
    // *************************************************
    // Системы
    // Система расчета геометрии
    this.engine.addSystem(new GeometrySystem());
    // Система расчета профиля.
    this.engine.addSystem(new ProfileSystem());
    // Система расчета филёнок.
    this.engine.addSystem(new PanelSystem());
    // Результаты.
    this.engine.addSystem(new ResultSystem());
    // Расчет работ для элементов заказа.
    this.engine.addSystem(new WorkSystem());
    // расчет работ для вложенных элементов.
    this.engine.addSystem(new NestedWorkSystem());
    // Создание графа заказа
    this.engine.addSystem(new OrderGraphSystem());
    // Система представления и отправки состояния книги
    this.engine.addSystem(new PresentationSystem());

    // *************************************************
    // Сущности

    for (const doc of this.book?.documents || []) {
      for (const elm of doc.elements || []) {
        this.addElementToEngine(elm, doc, this.book);
      }
    }
  }

  /**
   * Добавляет новую сущность в движок
   * @param element
   * @param document
   * @param book
   */
  addElementToEngine(
    element: ElementEntity,
    document: DocumentEntity,
    book: BookEntity,
  ): void {
    /** Создаем расширенный объект Сущности. */
    const entity = new MYEntity(element, document, book);

    for (const cmp of element.components || []) {
      const component = this.componentMapper.getInstance(
        cmp.componentName,
        cmp.data || {},
      );
      if (component) {
        entity.add(component as Component);
      }
    }
    this.engine.addEntity(entity);
  }

  /**
   * Удаляет сущность из движка.
   * Внимание! Удаленная сущность, перестает обрабатыватся движком,
   * Однако она не удаляется из заказа и при следующем открытии,
   * будет снова добавлена в движок
   * @param entity сущность
   * @returns void
   */
  removeElementFromEngine(entity: Entity): void {
    return this.engine.removeEntity(entity);
  }

  //**************************************************************************** */
  // Система событий комнаты.
  //**************************************************************************** */
  on(eventName: 'state', listener: RoomEventStateListener): UnsubscribeFunction;
  on(eventName: string, listener: RoomEventListener): UnsubscribeFunction {
    if (!this.multipleEvents[eventName]) {
      this.multipleEvents[eventName] = [];
    }
    this.multipleEvents[eventName].push(listener);
    return () =>
      (this.multipleEvents[eventName] = this.multipleEvents[eventName].filter(
        (eventFn) => listener !== eventFn,
      ));
  }

  // Генерация событий
  emit(eventName: 'state', roomId: number | string, state: BookEntity): void;
  emit(eventName: string, ...args: any[]): void {
    const events = this.multipleEvents[eventName];
    if (events && Array.isArray(events) && events.length) {
      events.forEach((e) => {
        if (e && typeof e === 'function') {
          return e.call(null, ...args);
        }
      });
    }
  }

  //**************************************************************************** */

  /**
   * Генерирует событие, которое отправляет состояние текущей книги.
   */
  async state() {
    this.emit('state', this.id, this.book);
  }

  /** Освобождение памяти, удаление всех данных комнаты. */
  async dispose() {
    // Очистка всех событий
    this.multipleEvents = {};
    console.log('Сохранение заказа и закрытие комнаты.');
  }
}
