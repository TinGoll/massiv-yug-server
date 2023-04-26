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
import { FacadeWorkSystem } from 'src/core/ecs/systems/facade.work.system';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { ElementEntity } from 'src/modules/repository/order/entities/document.element.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { BookUpdateInput } from 'src/modules/repository/order/inputs/book.input';
import { DocumentUpdateInput } from 'src/modules/repository/order/inputs/document.input';
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
import { ElementUpdateInput } from 'src/modules/repository/order/inputs/element.input';
import { OrderBlankSystem } from 'src/core/ecs/systems/order.blank.system';
import { OrderGraph } from 'src/core/common/graph/order-graph';
import { OrderGraphSystem } from 'src/core/ecs/systems/order.graph.system';
import { FacadeSystem } from 'src/core/ecs/systems/facade.system';
import { CombinedFacadeSystem } from 'src/core/ecs/systems/combined-facade.system';
import { PriceSystem } from 'src/core/ecs/systems/price.system';
import { WorkSystem } from 'src/core/ecs/systems/work.system';

interface MultipleEvent {
  [key: string | symbol]: Array<(...args: any[]) => void>;
}

interface EngineUserData {
  documentsToSave?: DocumentEntity[];
  needToSave?: boolean;
}

export class Room {
  public readonly id: number | string;
  private engine: MYEngine<EngineUserData>;
  private orderCreator: OrderCreator;
  private multipleEvents: MultipleEvent = {};

  public orderGraph: OrderGraph | null = null;

  constructor(
    public readonly roomManager: RoomManager,
    public readonly book: BookEntity,
    public readonly componentMapper: ComponentMapper,
  ) {
    this.id = book.id;
    this.engine = new MYEngine<EngineUserData>(book, this);
    this.orderCreator = roomManager.orderCreator;
  }

  getDocument(id: number): DocumentEntity | null {
    return (this.book.documents || []).find((d) => d.id === id) || null;
  }

  async assignClient(person: PersonEntity): Promise<BookEntity> {
    return await this.orderCreator.assignClient(this.book, person);
  }

  /** Добавить документ в комнату */
  async addDocument(
    options?: DocumentOptions,
    defaultData?: Partial<DocumentEntity>,
  ): Promise<DocumentEntity> {
    return await this.orderCreator.addDocument(this.book, options, defaultData);
  }

  /** Добавить документ в комнату */
  async addElement(
    document: DocumentEntity,
    identifier: string,
    options?: ElementOptions,
  ): Promise<void> {
    const element = await this.orderCreator.addElement(
      document,
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
    entity.needToSave = true;
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

    if (entity.needToSave) {
      this.engine.userData.needToSave = true;
      this.engine.userData.documentsToSave = [entity.documentEntity];
    }
  }

  /**
   * Основной метод изменения заказа.
   * @param authorId id автора события.
   * @param action объект - событие.
   */
  async act(author: PersonEntity, action: Processing.Action): Promise<void> {
    let document: DocumentEntity | null = null;
    if (!this.engine.userData) {
      // Если объекта не существует, создаем пустой.
      this.engine.userData = {};
    }
    switch (action.event) {
      // Удаление документа.
      case 'remove-document':
        const removeDocumentAction = <Processing.RemoveDocument>action;
        document = this.getDocument(removeDocumentAction.documentId);
        await this.orderCreator.removeDocument(this.book, document);
        break;
      // Событие добавления элемента в документ
      case 'update-book':
        const updateBookAction = <Processing.UpdateBook<BookUpdateInput>>action;
        await this.orderCreator.updateBook(this.book, updateBookAction.input);
        break;
      // Событие обновления документа
      case 'update-document':
        const updateDocumentAction = <
          Processing.UpdateDocument<DocumentUpdateInput>
        >action;
        await this.orderCreator.updateDocument(
          this.book,
          updateDocumentAction.input,
        );
        break;
      // Присвоить клиента
      case 'assign-book-client':
        const assignClientAction = <Processing.AssignBookClient<PersonEntity>>(
          action
        );
        await this.assignClient(assignClientAction.client);
        break;
      // Создать элемент заказа
      case 'add-element':
        const addElementAction = <Processing.AddElementAction>action;
        document = this.getDocument(addElementAction.documentId);
        if (document) {
          await this.addElement(
            document,
            addElementAction.identifier,
            addElementAction.options,
          );
        }
        break;
      // Создать элемент заказа
      case 'remove-element':
        const removeElementAction = <Processing.RemoveElement>action;
        document = this.getDocument(removeElementAction.documentId);
        if (document) {
          await this.orderCreator.removeElement(
            this.book,
            document,
            removeElementAction.elementId,
          );
        }
        break;
      case 'add-document':
        const addDocumentAction = <Processing.AddDocumentAction>action;
        await this.addDocument(
          addDocumentAction.options,
          addDocumentAction.defaultData,
        );
        break;
      // Изменение компонента сущности.
      case 'change-component':
        const changeComponentAction = <Processing.ChangeComponentAction>action;

        for (const cmpData of changeComponentAction.data) {
          await this.changeComponent(
            changeComponentAction.elementId,
            cmpData.componentKey,
            cmpData.componentData,
          );
        }

        if (changeComponentAction.options) {
          await this.changeElement(changeComponentAction.options);
        }

        break;
      // Присвоить цвет документа
      case 'assign-document-color':
        const actionDocumentColor = <
          Processing.AssignDocumentColor<AssignColorOptions>
        >action;
        document = this.getDocument(actionDocumentColor.documentId);
        if (document) {
          await this.orderCreator.assignColor(
            document,
            actionDocumentColor.color,
            actionDocumentColor.options,
          );
        }

        break;
      // Присвоить патину документа
      case 'assign-document-patina':
        const actionDocumentPatina = <
          Processing.AssignDocumentPatina<AssignPatinaOptions>
        >action;
        document = this.getDocument(actionDocumentPatina.documentId);

        if (document) {
          await this.orderCreator.assignPatina(
            document,
            actionDocumentPatina.patina,
            actionDocumentPatina.options,
          );
        }

        break;
      // Присвоить лак документа
      case 'assign-document-varnish':
        const actionDocumentVarnish = <
          Processing.AssignDocumentVarnish<AssignVarnishOptions>
        >action;
        document = this.getDocument(actionDocumentVarnish.documentId);
        if (document) {
          await this.orderCreator.assignVarnish(
            document,
            actionDocumentVarnish.varnish,
            actionDocumentVarnish.options,
          );
        }

        break;
      // Присвоить материал документа
      case 'assign-document-material':
        const actionDocumentMaterial = <Processing.AssignDocumentMaterial>(
          action
        );
        document = this.getDocument(actionDocumentMaterial.documentId);
        // console.log("document", document);

        if (document) {
          await this.orderCreator.assignMaterial(
            document,
            actionDocumentMaterial.material,
          );
        }
        break;
      // Присвоить профиль документа
      case 'assign-document-profile':
        const actionDocumentProfile = <
          Processing.AssignDocumentProfile<AssignProfileOptions>
        >action;
        document = this.getDocument(actionDocumentProfile.documentId);
        if (document) {
          await this.orderCreator.assignProfile(
            document,
            actionDocumentProfile.profile,
            actionDocumentProfile.options,
          );
        }

        break;
      // Присвоить филёнку документа
      case 'assign-document-panel':
        const actionDocumentPanel = <
          Processing.AssignDocumentPanel<AssignPanelOptions>
        >action;
        document = this.getDocument(actionDocumentPanel.documentId);
        if (document) {
          await this.orderCreator.assignPanel(
            document,
            actionDocumentPanel.panel,
            actionDocumentPanel.options,
          );
        }
        break;
      case 'assign-document-panel-material':
        const actionDocumentPanelMaterial = <
          Processing.AssignDocumentPanelMaterial
        >action;
        document = this.getDocument(actionDocumentPanelMaterial.documentId);
        if (document) {
          await this.orderCreator.assignPanelMaterial(
            document,
            actionDocumentPanelMaterial.material,
          );
        }
        break;
      case 'next-book-state':
        await this.orderCreator.nextBookState(this.book);
        this.engine.userData.documentsToSave = [...(this.book.documents || [])];
        for (const entity of this.engine.getEntities()) {
          entity.needToSave = true;
        }

        break;
      case 'set-book-state':
        const actionSetBookState = <Processing.SetBookState>action;
        await this.orderCreator.setBookState(
          this.book,
          actionSetBookState.state,
        );
        this.engine.userData.documentsToSave = [...(this.book.documents || [])];
        for (const entity of this.engine.getEntities()) {
          entity.needToSave = true;
        }
        break;
      default:
        break;
    }
  }

  /** Обновление елемента */
  async changeElement(options: ElementUpdateInput) {
    // Находим сущность по id
    const entity = this.engine
      .getEntities()
      .toArray()
      .find((e) => e.id === options.id);
    // Если сущность не найдена, завершаем с ошибкой.
    if (entity) {
      // Если изменили комментарий.
      if (options.note) {
        if (
          String(entity.elementEntity.note).toLowerCase() !==
          String(options.note).toLowerCase()
        ) {
          entity.needToSave = true; // Нужно ли сохранить в базу данных
          entity.elementEntity.note = options.note;
        }
      }
      // если изменили номенклатуру.
      if (options.name) {
        if (
          String(entity.elementEntity.name).toLowerCase() !==
          String(options.name).toLowerCase()
        ) {
          entity.needToSave = true; // Нужно ли сохранить в базу данных
          // Получаем стартовый набор для элемента.
          const [sample, identifierElement, elementComponents = []] =
            (await this.orderCreator.createElementStarter(
              options.name,
              entity.elementEntity.components,
            )) || [null, null, null];
          if (sample && identifierElement) {
            entity.elementEntity.identifier = identifierElement;
            entity.elementEntity.sample = sample;
            entity.elementEntity.name = identifierElement.identifier;
            entity.elementEntity.components = elementComponents;
          }
        }
      }
    }
  }

  /**
   * Сохранение заказа в базу данных.
   * Сохраняется только книга, документы и элементы,
   * которые помечены на сохранение
   */
  async save(): Promise<void> {
    if (!this.engine.userData) {
      this.engine.userData = {};
    }
    const entities = this.engine.getEntities();
    const bookNeedToSave = Boolean(this.engine.userData?.needToSave);

    const documents = this.engine.userData?.documentsToSave || [];
    // Сбрасываем массив документов, помеченых на сохранение.
    this.engine.userData.documentsToSave = [];
    // Сбрасываем метку о необходимости сохранить книгу.
    this.engine.userData.needToSave = false;

    // Сохраняем елементы, которые помечены на сохранение.
    for (const entity of entities) {
      if (entity.needToSave) {
        console.log('СОХРАНЕНИЕ СУЩНОСТИ', entity.id);
        entity.needToSave = false;
        const { id, components, identifier, name, note } = entity.elementEntity;

        await this.orderCreator.updateElement({
          components,
          identifier,
          name,
          note,
          id,
        });
      }
    }

    // Сохраняем документы
    for (const document of documents) {
      const { resultData, cost } = document;
      console.log('СОХРАНЕНИЕ ДОКУМЕНТА', document.id);
      await this.orderCreator
        .getDocumentRepository()
        .update({ id: document.id }, { resultData, cost });
    }

    // Сохраняем книгу
    if (bookNeedToSave) {
      console.log('СОХРАНЕНИЕ КНИГИ', this.book.id);
      const { resultData, graph, works } = this.book;
      await this.orderCreator
        .getBookRepository()
        .update({ id: this.book.id }, { resultData, graph, works });
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
    // this.roomManager.stop();
    console.log('update: ' + this.id);
    // Собираем обработанные данные.
    await this.buildState();
    // УБРАТЬ
    console.log('ОТПРАВЛЯЕМ СОСТОЯНИЕ НА КЛИЕНТ');
    await this.state();
  }

  // Сборка состояния.
  async buildState(): Promise<void> {
    for (const entity of this.engine.getEntities()) {
      for (const component of entity.elementEntity.components) {
        const cmp = entity.getComponent<any>(
          this.componentMapper.get(component.componentName),
        ) as IComponent;
        if (cmp && cmp.data) {
          component.data = cmp.data;
        }
      }
    }
  }

  /** Вызывается после создания команты. Переопределите, что бы использовать в своих целях. */
  afterCreation(): void {
    // *************************************************
    // Системы
    // Система расчета геометрии
    this.engine.addSystem(new GeometrySystem());
    // Система расчета стандартного фасада
    this.engine.addSystem(new FacadeSystem());
    // Система расчета комбинированного фасада
    this.engine.addSystem(new CombinedFacadeSystem());
    // Система, для расчета работ.
    this.engine.addSystem(new FacadeWorkSystem()); // Только для фасадов
    this.engine.addSystem(new WorkSystem()); // Для остальных элементов.
    // Система расчета стоимости для клиента.
    this.engine.addSystem(new PriceSystem());

    // // Система расчета профиля.
    // this.engine.addSystem(new ProfileSystem());
    // // Система расчета филёнок.
    // this.engine.addSystem(new PanelSystem());

    // // Результаты.
    // this.engine.addSystem(new ResultSystem());
    // // Расчет работ для элементов заказа.
    // this.engine.addSystem(new WorkSystem());

    // // расчет работ для вложенных элементов.
    // this.engine.addSystem(new NestedWorkSystem());
    // // Создание графа заказа

    // this.engine.addSystem(new OrderGraphSystem());
    // this.engine.addSystem(new OrderBlankSystem());

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
    this.engine.userData.needToSave = true;
    this.engine.userData.documentsToSave = [...(this.book.documents || [])];
    for (const entity of this.engine.getEntities()) {
      entity.needToSave = true;
    }
    console.time('save');
    await this.save();
    console.timeEnd('save');
    console.log('Сохранение заказа и закрытие комнаты.');
  }
}
