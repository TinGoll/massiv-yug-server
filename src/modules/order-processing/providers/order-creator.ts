import { Injectable } from '@nestjs/common';
import {
  AssignColorOptions,
  AssignPanelOptions,
  AssignPatinaOptions,
  AssignProfileOptions,
  AssignVarnishOptions,
  BookOptions,
  DocumentOptions,
  ElementOptions,
} from 'src/core/@types/app.types';

import { IComponent } from 'src/core/ecs/components/component-interface';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { ColorService } from 'src/modules/repository/color/color.service';
import { SampleColorEntity } from 'src/modules/repository/color/entities/sample.color.entity';
import { SampleMaterialEntity } from 'src/modules/repository/material/entities/sample.material.entity';
import { MaterialService } from 'src/modules/repository/material/material.service';
import {
  BookEntity,
  BOOK_BARCODE_PREFIX,
} from 'src/modules/repository/order/entities/book.entity';
import {
  ComponentData,
  ElementEntity,
} from 'src/modules/repository/order/entities/document.element.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import {
  ComponentKey,
  ElementSampleBody,
  SampleElementEntity,
} from 'src/modules/repository/order/entities/element.entity';
import { BookUpdateInput } from 'src/modules/repository/order/inputs/book.input';
import { DocumentUpdateInput } from 'src/modules/repository/order/inputs/document.input';
import { OrderService } from 'src/modules/repository/order/order.service';
import { SamplePanelEntity } from 'src/modules/repository/panel/entities/sample.panel.entity';
import { PanelService } from 'src/modules/repository/panel/panel.service';
import { SamplePatinaEntity } from 'src/modules/repository/patina/entities/sample.patina.entity';
import { PatinaService } from 'src/modules/repository/patina/patina.service';
import { SampleProfileEntity } from 'src/modules/repository/profile/entities/sample.profile.entity';
import { ProfileService } from 'src/modules/repository/profile/profile.service';
import { SectorService } from 'src/modules/repository/sector/sector.service';
import { SettingService } from 'src/modules/repository/setting/setting.service';
import { SampleVarnishEntity } from 'src/modules/repository/varnish/entities/sample.varnish.entity';
import { VarnishService } from 'src/modules/repository/varnish/varnish.service';
import { SampleWorkEntity } from 'src/modules/repository/work/entities/sample.work.entity';
import { WorkService } from 'src/modules/repository/work/work.service';
import { ComponentMapper } from './component-mapper';
import { BookState } from 'src/modules/repository/order/entities/book.state';

@Injectable()
export class OrderCreator {
  constructor(
    private readonly componentMapper: ComponentMapper,
    private readonly orderService: OrderService,
    private readonly settingService: SettingService,
    private readonly panelService: PanelService,
    private readonly varnishService: VarnishService,
    private readonly patinaService: PatinaService,
    private readonly colorService: ColorService,
    private readonly workService: WorkService,
    private readonly sectorService: SectorService,
    private readonly profileService: ProfileService,
    private readonly materialService: MaterialService,
  ) {}

  /**
   * Открытие книги заказа.
   * @param bookId
   */
  async openBook(bookId: number | string): Promise<BookEntity> {
    return await this.orderService.findBookToId(Number(bookId));
  }

  /**
   * Переключение состояния книги заказа.
   * @param book Книга заказа
   * @returns истина в случае успеха, ложь в случае неудачи.
   */
  async nextBookState(book: BookEntity): Promise<boolean> {
    const state = book.state;
    try {
      if (state === BookState.EDITING) {
        book.state = BookState.CALCULATION_OF_BLANKS;
      }
      if (state === BookState.CALCULATION_OF_BLANKS) {
        book.state = BookState.PLANNING;
      }
      if (state === BookState.PLANNING) {
        book.state = BookState.IN_WORK;
      }
      if (state === BookState.IN_WORK || state === null) {
        book.state = BookState.COMPLETE;
      }
      if (book.state !== state) {
        await this.orderService.saveBook(book);
      }
      return true;
    } catch (error) {
      book.state = state;
      return false;
    }
  }

  /**
   * Установка состояния книги.
   * @param book Книга заказа
   * @param state новое состояние.
   * @returns истина в случае успеха, ложь в случае неудачи.
   */
  async setBookState(book: BookEntity, state: BookState): Promise<boolean> {
    const previusState = book.state;
    try {
      book.state = state;
      await this.orderService.saveBook(book);
      return true;
    } catch (error) {
      book.state = previusState;
      return false;
    }
  }

  /** Получить все учатски */
  async getSectors() {
    return await this.sectorService.findAll();
  }

  async addBook(
    author: PersonEntity,
    options: BookOptions = {},
  ): Promise<BookEntity> {
    const { bookId, clientId, ...input } = options;
    const book = this.orderService.newBook(input);
    const status = await this.orderService.findStatusToId(1);
    book.id = bookId;
    book.status = status;
    book.author = author;

    const works = await this.workService.findAll();
    book.works = works;

    await this.orderService.saveBook(book);
    if (book.documentType) {
      await this.addDocument(book, { documentType: book.documentType });
    }
    book.barcode = this.generateBarcode(book.id, '');

    return await this.orderService.saveBook(book);
  }

  /** Присвоить все работы книге заказов */
  async assignWorksBook(book: BookEntity): Promise<void> {
    const works = await this.workService.findAll();
    if (!book.works) {
      book.works = works;
    } else {
      for (const work of works) {
        if (
          !Boolean(
            book.works.find(
              (w) => w.name.toUpperCase() === work.name.toUpperCase(),
            ),
          )
        ) {
          book.works.push(work);
        }
      }
    }
    await this.orderService.saveBook(book);
  }

  async updateBook(
    book: BookEntity,
    input: BookUpdateInput,
  ): Promise<BookEntity> {
    const updatedBook = await this.orderService.updateBook(input);
    const { id, ...keys } = input;
    for (const key in keys) {
      book[key] = updatedBook[key];
    }
    return book;
  }

  async updateDocument(
    book: BookEntity,
    input: DocumentUpdateInput,
  ): Promise<BookEntity> {
    const updatedDocument = await this.orderService.updateDocument(input);
    const document = (book.documents || []).find((d) => d.id === input.id);
    const { id, ...keys } = input;
    for (const key in keys) {
      if (document) {
        document[key] = updatedDocument[key];
      }
    }
    return book;
  }

  /** Обновление элемента в базе даных. */
  async updateElement(
    element: Partial<ElementEntity> & { id: number },
  ): Promise<Partial<ElementEntity>> {
    await this.orderService
      .getDocumentElementRepository()
      .update({ id: element.id }, element);
    return element;
  }

  async removeDocument(
    book: BookEntity,
    document: DocumentEntity,
  ): Promise<void> {
    await this.orderService.removeDocument(document.id);
    book.documents = (book.documents || []).filter(
      (doc) => doc.id !== document.id,
    );
  }

  async addDocument(
    book: BookEntity,
    options?: DocumentOptions,
    defaultData?: Partial<DocumentEntity>,
  ): Promise<DocumentEntity> {
    console.time('add-document');

    const document = await this.orderService.createDocument(options);
    book.documents = [...(book.documents || []), document];

    await this.orderService.saveBook(book);

    await this.orderService.assignColor(
      document,
      defaultData?.color?.sample || null,
      { ...(defaultData?.color || {}) },
    );
    await this.orderService.assignPatina(
      document,
      defaultData?.patina?.sample || null,
      defaultData?.patina || {},
    );
    await this.orderService.assignVarnish(
      document,
      defaultData?.varnish?.sample || null,
      defaultData?.varnish || {},
    );
    await this.orderService.assignMaterial(document, defaultData?.material);
    await this.orderService.assignPanel(
      document,
      defaultData?.panel?.sample || null,
      defaultData?.panel || {},
    );
    await this.orderService.assignProfile(
      document,
      defaultData?.profile?.sample || null,
      defaultData?.profile || {},
    );

    if (book.documents.length > 1) {
      book.documents.sort((a, b) => a.id - b.id);
    }

    console.timeEnd('add-document');
    return document;
  }

  async assignClient(
    book: BookEntity,
    person: PersonEntity | null,
  ): Promise<BookEntity> {
    book.client = person;
    return await this.orderService.saveBook(book);
  }

  /**
   * Создать елемент - пустышку. Если при миграции заказа, обнаружится неизвестный элемент
   * будет создана пустышка.
   * @param documentId
   * @param options
   */
  async addDummy(
    documentId: number,
    options: ElementOptions = {},
  ): Promise<ElementEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const dummy = await this.orderService.findSampleElementToName('No Name');
    if (!dummy) return null;

    const { components: optionComponents = [], ...opt } = options;

    const element = this.orderService.newElement({
      components: optionComponents,
      ...opt,
    });
    element.identifier = null;
    element.sample = dummy;

    await this.orderService.saveElement(element);
    document.elements = [...(document.elements || []), element];
    await this.orderService.saveDocument(document);
    return element;
  }

  async removeElement(
    book: BookEntity,
    document: DocumentEntity,
    elementId: number,
  ): Promise<void> {
    const result = await this.orderService.removeElement(elementId);
    document.elements = (document.elements || []).filter(
      (el) => el.id !== elementId,
    );
  }

  /** Получение стартовых данных, для создания элемента */
  async createElementStarter(
    identifier: string,
    optionComponents: ComponentData<object>[] = [],
  ): Promise<
    [SampleElementEntity, ElementSampleBody, ComponentData<object>[]]
  > {
    // Получаем кортеж из элемента и псефдоэлемента, по идентификатору
    const elementTuple = await this.getElementToIdentifier(identifier);
    // Если нет такого идентификатора возвращаем null;
    if (!elementTuple) return null;
    // С помощью деструктуризации, получаем елемент и псевдоэлемент.
    const [sample, identifierElement] = elementTuple;

    // Создаем стартовый набор для компонентов.
    const elementComponents: ComponentData[] = sample.components.map(
      (componentName) => {
        const defaultData = sample.default.find(
          (df) => df.componentName === componentName,
        );
        const identifierComponent = identifierElement.componentData.find(
          (df) => df.componentName === componentName,
        );

        const optionComponent = optionComponents.find(
          (df) => df.componentName === componentName,
        );

        // Загружаем данные оригинального компонента. С помощью componentMapper, получаем Instance компонента.
        const cmpInstance =
          this.componentMapper.getInstance<IComponent>(componentName);

        let data: object | null = { ...(cmpInstance?.getData() || {}) };

        // Процес определения данных компонента по умолчанию.
        // Если данные в шаблоне заданы по умолчанию
        if (defaultData) {
          // Если данные в шаблоне заданы, но помечены как null, присваиваем null (отключаем этот компонент)
          if (defaultData.data === null) {
            data = null;
          } else {
            // Если данные не null, и существуют
            if (defaultData.data) {
              data = defaultData.data;
            }
            // Если данные не указаны, оставляем пустой объект.
          }
        }

        // Если в identifier переопределен компонент, проводим такую же процедуру.
        if (identifierComponent) {
          if (identifierComponent.data === null) {
            data = null;
          } else {
            if (identifierComponent.data) {
              data = identifierComponent.data;
            }
          }
        }

        // Если в optionComponent переопределен компонент, проводим такую же процедуру.
        if (optionComponent) {
          if (optionComponent.data === null) {
            // data = null;
          } else {
            if (optionComponent.data) {
              data = { ...data, ...optionComponent.data };
            }
          }
        }

        const cmpItem: ComponentData = {
          componentName,
          data,
        };
        return cmpItem;
      },
    );

    return [sample, identifierElement, elementComponents];
  }

  /** Добавление элемента в документ книги. */
  async addElement(
    document: DocumentEntity,
    identifier: string,
    options: ElementOptions = {},
  ): Promise<ElementEntity> {
    // Получаем передаваемые компоненты из опций. Это едиственный метод изменения компонентов, при добавлении элемента
    // Переданные данные не заменяют компонент, а изменяют данные.
    const { components: optionComponents = [], ...opt } = options;

    // Получаем необходимые объекты, для создания компонента.
    const elementTuple = await this.createElementStarter(
      identifier, // Наззвание
      optionComponents, // Стартовые данные компонентов.
    );
    // Если данных нет, выходим и возвращаем null;
    if (!elementTuple) {
      return null;
    }
    // Если данные существуют, деструктуризируем кортеж.
    // Первый элемент, шаблон элемента
    const [sample, identifierElement, elementComponents] = elementTuple;

    // Создаем сущность элемента и присваиваем полученые знчения.
    const element = this.orderService.newElement({
      name: identifierElement.identifier,
      components: elementComponents,
      ...opt,
    });
    element.identifier = identifierElement;
    element.identifier.group = sample.name;
    element.identifier.index = sample.index;

    element.sample = sample;
    // Сохраняем сущность в БД.
    await this.orderService.saveElement(element);
    // Добавляем новую сущность в документ.
    document.elements = [...(document.elements || []), element];
    // Сохраняем документ.
    await this.orderService.saveDocument(document);

    return element;
  }

  /** Возвращает кортеж, первый элемент которого - Шаблон элемента, второй identifier элемент. в случае неудачи - null */
  async getElementToIdentifier(
    identifier: string,
  ): Promise<[SampleElementEntity, ElementSampleBody] | null> {
    const elements = await this.orderService.findAllElementSamples();
    let identifierElement: ElementSampleBody;
    for (const element of elements) {
      identifierElement = element.body.find((b) => b.identifier === identifier);
      if (identifierElement) {
        return [element, identifierElement];
      }
    }
    return null;
  }

  /** Получить уникальный список, всех идентификаторов элементов. */
  async getIdentifiers(): Promise<string[]> {
    const elements = await this.orderService.findAllElementSamples();
    return [
      ...new Set(
        elements.reduce<string[]>((acc, item) => {
          const identifiers = item.body.reduce<string[]>((iAcc, iItem) => {
            iAcc.push(iItem.identifier);
            return iAcc;
          }, []);
          acc.push(...identifiers);

          return acc;
        }, []),
      ),
    ];
  }

  /** Присвоить цвет документу заказа */
  async assignColor(
    document: DocumentEntity,
    color: SampleColorEntity | null,
    options: AssignColorOptions = {},
  ): Promise<DocumentEntity> {
    const { converterId, data, ...opt } = options;
    let converter;
    if (converterId) {
      // Присваиваем текущий конвертер.
      converter = this.colorService.findConverterToId(converterId);
    }
    // Присвоение цвета и запись параметров.
    await this.orderService.assignColor(document, color, {
      ...opt,
      data: data as any,
      converter,
    });
    return document;
  }

  /** Присвоить Патину документу заказа */
  async assignPatina(
    document: DocumentEntity,
    patina: SamplePatinaEntity | null,
    options: AssignPatinaOptions = {},
  ): Promise<DocumentEntity> {
    const { converterId, ...opt } = options;
    let converter;
    if (converterId) {
      // Присваиваем текущий конвертер.
      converter = this.patinaService.findConverterToId(converterId);
    }
    await this.orderService.assignPatina(document, patina, {
      ...opt,
      converter,
    });
    return document;
  }

  /** Присвоить Лак документу заказа */
  async assignVarnish(
    document: DocumentEntity,
    varnish: SampleVarnishEntity | null,
    options: AssignVarnishOptions = {},
  ): Promise<DocumentEntity> {
    await this.orderService.assignVarnish(document, varnish, {
      ...options,
    });
    return document;
  }

  /** Присвоить Материал документу заказа */
  async assignMaterial(
    document: DocumentEntity,
    material: SampleMaterialEntity | null,
  ): Promise<DocumentEntity> {
    await this.orderService.assignMaterial(document, material);
    return document;
  }

  /** Присвоить Филёнку документу заказа */
  async assignPanel(
    document: DocumentEntity,
    panel: SamplePanelEntity,
    options: AssignPanelOptions = {},
  ): Promise<DocumentEntity> {
    const { colorId, materialId, ...opt } = options;
    let color;
    let material;
    if (colorId) {
      color = await this.colorService.findColorToId(colorId);
    }
    if (materialId) {
      material = await this.materialService.findToId(materialId);
    }
    await this.orderService.assignPanel(document, panel, {
      ...opt,
      color,
      material,
    });
    return document;
  }

  /** Присвоить Филёнку документу заказа */
  async assignPanelMaterial(
    document: DocumentEntity,
    material: SampleMaterialEntity,
  ): Promise<DocumentEntity> {
    await this.orderService.assignPanel(document, document.panel.sample, {
      material,
    });
    return document;
  }

  /** Присвоить Профиль документу заказа */
  async assignProfile(
    document: DocumentEntity,
    profile: SampleProfileEntity,
    options: AssignProfileOptions = {},
  ): Promise<DocumentEntity> {
    await this.orderService.assignProfile(document, profile, {
      ...options,
    });
    return document;
  }

  generateBarcode(id: number, type: string): string {
    let barcodeLength = 7;
    let lenght = `${id}`.length;
    let repeat = barcodeLength - lenght < 0 ? 0 : barcodeLength - lenght;
    let barcode = `${BOOK_BARCODE_PREFIX}${'0'.repeat(repeat)}${id}`;
    return barcode;
  }

  /** Метод работы с компонентом. */
  async changeComponent<T extends object = object>(
    elementId: number,
    componentKey: ComponentKey,
    data: Partial<T>,
  ): Promise<ElementEntity> {
    const element = await this.orderService.findElementToId(elementId);
    if (!element) {
      return null;
    }
    const result = this.componentMapper.changeComponent<T>(
      componentKey,
      element.components,
      data,
    );
    console.log('change cmp result', result);
    return element;
    // Автосохранение после изменения отключено,
    // так как сохранение будет производится после
    // Обработки системами.
    // Что бы включить, раскомментируй код нижу и закоментируй код выше)
    // return await this.orderService.saveElement(element);
  }

  async getWorks(): Promise<SampleWorkEntity[]> {
    return await this.workService.findAll();
  }

  /**  */
  getDocumentRepository() {
    return this.orderService.getDocumentRepository();
  }

  /**  */
  getBookRepository() {
    return this.orderService.getBookRepository();
  }
}
