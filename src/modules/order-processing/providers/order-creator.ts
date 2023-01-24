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
import { OrderService } from 'src/modules/repository/order/order.service';
import { PanelService } from 'src/modules/repository/panel/panel.service';
import { PatinaService } from 'src/modules/repository/patina/patina.service';
import { ProfileService } from 'src/modules/repository/profile/profile.service';
import { SectorService } from 'src/modules/repository/sector/sector.service';
import { SettingService } from 'src/modules/repository/setting/setting.service';
import { VarnishService } from 'src/modules/repository/varnish/varnish.service';
import { SampleWorkEntity } from 'src/modules/repository/work/entities/sample.work.entity';
import { WorkService } from 'src/modules/repository/work/work.service';
import { ComponentMapper } from './component-mapper';

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

  async addDocument(
    book: BookEntity,
    options?: DocumentOptions,
  ): Promise<DocumentEntity> {
    console.time('add-document');
    const document = await this.orderService.createDocument(options);
    book.documents = [...(book.documents || []), document];
    await this.orderService.assignColor(document, null, {});
    await this.orderService.assignPatina(document, null, {});
    await this.orderService.assignVarnish(document, null, {});
    await this.orderService.assignMaterial(document, null);
    await this.orderService.assignPanel(document, null, {});
    await this.orderService.assignProfile(document, null, {});
    console.timeEnd('add-document');
    await this.orderService.saveBook(book);
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

  /** Добавление элемента в документ книги. */
  async addElement(
    documentId: number,
    identifier: string,
    options: ElementOptions = {},
  ): Promise<ElementEntity> {
    // Получаем документ
    const document = await this.orderService.findDocumentToId(documentId);
    // Если документ не найден, завершаем процедуру с ошибкой
    if (!document) throw new Error('Документ не найден.');

    // Получаем кортеж из элемента и псефдоэлемента, по идентификатору
    const elementTuple = await this.getElementToIdentifier(identifier);
    // Если нет такого идентификатора возвращаем null;
    if (!elementTuple) return null;
    // С помощью деструктуризации, получаем елемент и псевдоэлемент.
    const [sample, identifierElement] = elementTuple;
    // Получаем передаваемые компоненты из опций. Это едиственный метод изменения компонентов, при добавлении элемента
    // Переданные данные не заменяют компонент, а изменяют данные.
    const { components: optionComponents = [], ...opt } = options;

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
    const element = this.orderService.newElement({
      name: identifierElement.identifier,
      components: elementComponents,
      ...opt,
    });
    element.identifier = identifierElement;
    element.sample = sample;

    await this.orderService.saveElement(element);
    document.elements = [...(document.elements || []), element];
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
    documentId: number,
    name: string,
    options: AssignColorOptions = {},
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const color = await this.colorService.findColorToName(name);
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
    documentId: number,
    name: string,
    options: AssignPatinaOptions = {},
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const patina = await this.patinaService.findPatinaToName(name);
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
    documentId: number,
    name: string,
    options: AssignVarnishOptions = {},
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const varnish = await this.varnishService.findToName(name);
    await this.orderService.assignVarnish(document, varnish, {
      ...options,
    });
    return document;
  }

  /** Присвоить Материал документу заказа */
  async assignMaterial(
    documentId: number,
    name: string,
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const material = await this.materialService.findToName(name);
    await this.orderService.assignMaterial(document, material);
    return document;
  }

  /** Присвоить Филёнку документу заказа */
  async assignPanel(
    documentId: number,
    name: string,
    options: AssignPanelOptions = {},
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const { colorId, materialId, ...opt } = options;
    const panel = await this.panelService.findToName(name);
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

  /** Присвоить Профиль документу заказа */
  async assignProfile(
    documentId: number,
    name: string,
    options: AssignProfileOptions = {},
  ): Promise<DocumentEntity> {
    const document = await this.orderService.findDocumentToId(documentId);
    if (!document) throw new Error('Документ не найден.');
    const profile = await this.profileService.findToName(name);
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
}
