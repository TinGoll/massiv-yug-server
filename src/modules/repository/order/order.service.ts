import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { BookStatusEntity } from './entities/book.status.entity';
import { DocumentColorEntity } from './entities/document.color.entity';
import { ElementEntity } from './entities/document.element.entity';
import { DocumentEntity } from './entities/document.entity';
import { DocumentPanelEntity } from './entities/document.panel.entity';
import { DocumentPatinaEntity } from './entities/document.patina.entity';
import { DocumentProfileEntity } from './entities/document.profile.entity';
import { DocumentVarnishEntity } from './entities/document.varnish.entity';
import { BookCreateInput, BookUpdateInput } from './inputs/book.input';
import {
  DocumentCreateInput,
  DocumentUpdateInput,
} from './inputs/document.input';
import {
  DocumentElementCreateInput,
  DocumentElementUpdateInput,
} from './inputs/document.element.input';
import { SampleElementEntity } from './entities/element.entity';
import { ElementCreateInput, ElementUpdateInput } from './inputs/element.input';
import {
  BookStatusCreateInput,
  BookStatusUpdateInput,
} from './inputs/book.status.input';
import { SampleColorEntity } from '../color/entities/sample.color.entity';
import { SamplePatinaEntity } from '../patina/entities/sample.patina.entity';
import { SampleVarnishEntity } from '../varnish/entities/sample.varnish.entity';
import { SampleMaterialEntity } from '../material/entities/sample.material.entity';
import { SamplePanelEntity } from '../panel/entities/sample.panel.entity';
import { SampleProfileEntity } from '../profile/entities/sample.profile.entity';
import { PersonEntity } from 'src/modules/person/entities/person.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    @InjectRepository(ElementEntity)
    private readonly docElementRepository: Repository<ElementEntity>,
    @InjectRepository(SampleElementEntity)
    private readonly elementRepository: Repository<SampleElementEntity>,
    @InjectRepository(BookStatusEntity)
    private readonly statusRepository: Repository<BookStatusEntity>,
    @InjectRepository(DocumentColorEntity)
    private readonly docColorRepository: Repository<DocumentColorEntity>,
    @InjectRepository(DocumentPatinaEntity)
    private readonly docPatinaRepository: Repository<DocumentPatinaEntity>,
    @InjectRepository(DocumentVarnishEntity)
    private readonly docVarnishRepository: Repository<DocumentVarnishEntity>,
    @InjectRepository(DocumentPanelEntity)
    private readonly docPanelRepository: Repository<DocumentPanelEntity>,
    @InjectRepository(DocumentProfileEntity)
    private readonly docProfileRepository: Repository<DocumentProfileEntity>,
  ) {
    // Создание стандартных статусов.
    this.getAllStatuses().then((res) => {
      if (!res.length) {
        this.createDefaultStatuses();
      }
    });
  }

  /** Создать новый статус книги */
  async createStatus(input: BookStatusCreateInput): Promise<BookStatusEntity> {
    const candidate = await this.findStatusToName(input.name);
    if (candidate) throw new Error('Статус с таким названием уже существует.');

    const status = this.statusRepository.create({ ...input });
    await this.statusRepository.save(status);
    return status;
  }

  async createDefaultStatuses(): Promise<void> {
    const sts: BookStatusCreateInput[] = [
      { name: 'На оформлении', index: 1 },
      { name: 'В работе', index: 2 },
    ];
    for (const st of sts) {
      await this.createStatus(st);
    }
  }

  /** Обновить статус книги */
  async updateStatus(input: BookStatusUpdateInput): Promise<BookStatusEntity> {
    await this.statusRepository.update({ id: input.id }, { ...input });
    return await this.findStatusToId(input.id);
  }
  async findStatusToId(id: number): Promise<BookStatusEntity | null> {
    return await this.statusRepository.findOne({ where: { id } });
  }
  async findStatusToName(name: string): Promise<BookStatusEntity | null> {
    return await this.statusRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }
  /** Получить все статусы */
  async getAllStatuses(): Promise<BookStatusEntity[]> {
    return await this.statusRepository.find({ where: { deleted: false } });
  }

  newBook(input: Partial<BookCreateInput> = {}): BookEntity {
    return this.bookRepository.create({ ...input });
  }

  /** Создать новую книгу заказа */
  async createBook(input: BookCreateInput): Promise<BookEntity> {
    const entity = this.bookRepository.create({ ...input });
    await this.saveBook(entity);
    return entity;
  }

  /** Сохранить книгу заказа */
  async saveBook(entity: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(entity);
  }

  async assignDocumentToBook(
    book: BookEntity,
    document: DocumentEntity,
  ): Promise<BookEntity> {
    if (!book.documents) book.documents = [];
    book.documents.push(document);
    return await this.saveBook(book);
  }

  /** Обновить книгу заказа */
  async updateBook(input: BookUpdateInput): Promise<BookEntity> {
    await this.bookRepository.update({ id: input.id }, { ...input });
    return await this.findBookToId(input.id);
  }
  /** Удалить книгу заказа */
  async removeBook(id: number): Promise<number> {
    await this.bookRepository.update({ id }, { deleted: true });
    return id;
  }
  /** Получить книгу по id */
  async findBookToId(id: number): Promise<BookEntity | null> {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!book) return null;
    book.documents = book.documents?.filter((d) => !d.deleted) || [];
    return book;
  }

  /** Создать новый документ */
  async createDocument(input: DocumentCreateInput): Promise<DocumentEntity> {
    const entity = this.documentRepository.create({ ...input });
    await this.saveDocument(entity);
    return entity;
  }

  /** Добавить документ в книгу */
  async addDocument(
    bookId: number,
    document: DocumentEntity,
  ): Promise<DocumentEntity> {
    const book = await this.findBookToId(bookId);
    if (!book) throw new Error('Книга с таким id не найдена в базе данных');
    // if (!document.id) await this.saveDocument(document);
    if (!book.documents) book.documents = [];
    book.documents.push(document);
    await this.saveBook(book);
    return document;
  }

  /** Сохранить документ */
  async saveDocument(entity: DocumentEntity): Promise<DocumentEntity> {
    return await this.documentRepository.save(entity);
  }
  /** Обновить документ */
  async updateDocument(input: DocumentUpdateInput): Promise<DocumentEntity> {
    await this.documentRepository.update({ id: input.id }, { ...input });
    return await this.findDocumentToId(input.id);
  }
  /** Получение документа по id */
  async findDocumentToId(id: number): Promise<DocumentEntity | null> {
    return await this.documentRepository.findOne({ where: { id } });
  }
  /** Удалить документ */
  async removeDocument(id: number): Promise<number> {
    await this.documentRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Удалить элемент заказа */
  async removeElement(id: number): Promise<DeleteResult> {
    const deleteResult = await this.docElementRepository
      .createQueryBuilder('order_document_elements')
      .delete()
      .from(ElementEntity)
      .where('id = :id', { id })
      .execute();

    return deleteResult;
  }

  /** Получить документы книги. */
  async getBookDocuments(bookId: number): Promise<DocumentEntity[]> {
    return await this.documentRepository.find({
      where: {
        deleted: false,
        book: {
          id: bookId,
        },
      },
    });
  }

  // Дополнительные поля книги.
  async assignStatusToBook(
    book: BookEntity,
    status: BookStatusEntity,
  ): Promise<BookEntity> {
    book.status = status;
    await this.saveBook(book);
    return book;
  }
  /** Присвоить объект клиента книге заказа */
  async assignClientToBook(
    book: BookEntity,
    client: PersonEntity,
  ): Promise<BookEntity> {
    book.client = client;
    await this.saveBook(book);
    return book;
  }
  /** Присвоить объект автора книге заказа. */
  async assignAuthorToBook(
    book: BookEntity,
    author: PersonEntity,
  ): Promise<BookEntity> {
    book.author = author;
    await this.saveBook(book);
    return book;
  }

  // Дополнительные поля документа.
  /** Присвоить цвет */
  async assignColor(
    document: DocumentEntity,
    color: SampleColorEntity | null,
    options: Partial<DocumentColorEntity> = {},
  ): Promise<DocumentEntity> {
    const { id, sample, document: doc, ...opt } = options;

    if (!document.color) {
      await this.createDocumentColor(document);
    }

    await this.docColorRepository.update(
      { id: document.color.id },
      { ...document.color, ...opt },
    );

    document.color = await this.docColorRepository.findOne({
      where: { id: document.color.id },
    });
    document.color.sample = color;
    await this.docColorRepository.save(document.color);
    return document;
  }

  /** Создать документ - цвет объект. */
  async createDocumentColor(
    document: DocumentEntity,
  ): Promise<DocumentColorEntity> {
    const color = this.docColorRepository.create({ document });
    await this.docColorRepository.save(color);

    document.color = color;
    await this.saveDocument(document);
    return document.color;
  }
  /** Присовеить патину */
  async assignPatina(
    document: DocumentEntity,
    patina: SamplePatinaEntity | null,
    options: Partial<DocumentPatinaEntity> = {},
  ): Promise<DocumentEntity> {
    const { id, sample, document: doc, ...opt } = options;
    if (!document.patina) {
      await this.createDocumentPatina(document);
    }
    await this.docPatinaRepository.update(
      { id: document.patina.id },
      { ...document.patina, ...opt },
    );
    document.patina = await this.docPatinaRepository.findOne({
      where: { id: document.patina.id },
    });
    document.patina.sample = patina;
    await this.docPatinaRepository.save(document.patina);
    return document;
  }

  /** Создать документ - патина объект. */
  async createDocumentPatina(
    document: DocumentEntity,
  ): Promise<DocumentPatinaEntity> {
    const patina = this.docPatinaRepository.create({ document });
    await this.docPatinaRepository.save(patina);
    document.patina = patina;
    await this.saveDocument(document);
    return document.patina;
  }
  /** Присвоить лак */
  async assignVarnish(
    document: DocumentEntity,
    varnish: SampleVarnishEntity | null,
    options: Partial<DocumentVarnishEntity> = {},
  ): Promise<DocumentEntity> {
    const { id, sample, document: doc, ...opt } = options;
    if (!document.varnish) {
      await this.createDocumentVarnish(document);
    }
    await this.docVarnishRepository.update(
      { id: document.varnish.id },
      { ...document.varnish, ...opt },
    );
    document.varnish = await this.docVarnishRepository.findOne({
      where: { id: document.varnish.id },
    });
    document.varnish.sample = varnish;
    await this.docVarnishRepository.save(document.varnish);
    return document;
  }

  /** Создать документ - лак объект. */
  async createDocumentVarnish(
    document: DocumentEntity,
  ): Promise<DocumentVarnishEntity> {
    const varnish = this.docVarnishRepository.create({ document });
    await this.docVarnishRepository.save(varnish);
    document.varnish = varnish;
    await this.saveDocument(document);
    return document.varnish;
  }

  /** Присвоить материал */
  async assignMaterial(
    document: DocumentEntity,
    material: SampleMaterialEntity | null,
  ): Promise<DocumentEntity> {
    document.material = material;
    await this.saveDocument(document);
    return document;
  }

  /** Присвоить филёнку */
  async assignPanel(
    document: DocumentEntity,
    panel: SamplePanelEntity | null,
    options: Partial<DocumentPanelEntity> = {},
  ): Promise<DocumentEntity> {
    const { id, sample, document: doc, ...opt } = options;
    if (!document.panel) {
      await this.createDocumentPanel(document);
    }

    await this.docPanelRepository.update(
      { id: document.panel.id },
      { ...document.panel, ...opt, sample: panel },
    );

    document.panel = await this.docPanelRepository.findOne({
      where: { id: document.panel.id },
    });

    document.panel.sample = panel;
    await this.docPanelRepository.save(document.panel);
    return document;
  }

  /** Создать документ - филёнка объект. */
  async createDocumentPanel(
    document: DocumentEntity,
  ): Promise<DocumentPanelEntity> {
    const panel = this.docPanelRepository.create({ document });
    await this.docPanelRepository.save(panel);
    document.panel = panel;
    await this.saveDocument(document);
    return document.panel;
  }

  /** Присвоить профиль */
  async assignProfile(
    document: DocumentEntity,
    profile: SampleProfileEntity,
    options: Partial<DocumentProfileEntity> = {},
  ): Promise<DocumentEntity> {
    const { id, sample, document: doc, ...opt } = options;
    if (!document.profile) {
      await this.createDocumentProfile(document);
    }

    await this.docProfileRepository.update(
      { id: document.profile.id },
      { widths: [...(profile?.widths || [])], ...opt },
    );
    document.profile = await this.docProfileRepository.findOne({
      where: { id: document.profile.id },
    });
    document.profile.sample = profile;
    await this.docProfileRepository.save(document.profile);
    return document;
  }

  /** Создать документ - профиль объект */
  async createDocumentProfile(
    document: DocumentEntity,
  ): Promise<DocumentProfileEntity> {
    const profile = this.docProfileRepository.create({ document });
    await this.docProfileRepository.save(profile);
    document.profile = profile;
    await this.saveDocument(document);
    return document.profile;
  }

  /** Создать шаблон элемента */
  async createSampleElement(
    input: DocumentElementCreateInput,
  ): Promise<SampleElementEntity> {
    const candidate = await this.findSampleElementToName(input.name);
    if (candidate)
      throw new Error('Номенклатура с таким названием уже существует');
    const entity = this.elementRepository.create({ ...input });
    return await this.saveSampleElement(entity);
  }

  /** Получить шаблон элемента по id */
  async findSampleElementToId(id: number): Promise<SampleElementEntity | null> {
    return this.elementRepository.findOne({ where: { id } });
  }

  /** Получить шаблон элемента по названию */
  async findSampleElementToName(
    name: string,
  ): Promise<SampleElementEntity | null> {
    return await this.elementRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAllElementSamples(): Promise<SampleElementEntity[]> {
    return await this.elementRepository.find({
      order: {
        index: 'DESC',
      },
    });
  }

  /** Сохранить шаблон элемента */
  async saveSampleElement(
    entity: SampleElementEntity,
  ): Promise<SampleElementEntity> {
    return await this.elementRepository.save(entity);
  }
  /** Обновить шаблон элемента */
  async updateSampleElement(
    input: DocumentElementUpdateInput,
  ): Promise<SampleElementEntity> {
    await this.elementRepository.update({ id: input.id }, { ...input });
    return await this.findSampleElementToId(input.id);
  }
  /** Удалить шаблон элемента */
  async removeSampleElement(id: number): Promise<number> {
    await this.elementRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создание нового элемента документа. Не сохранен в БД! */
  newElement(input: ElementCreateInput): ElementEntity {
    return this.docElementRepository.create({ ...input });
  }
  /** Создать елемент документа */
  async createElement(input: ElementCreateInput): Promise<ElementEntity> {
    const element = this.newElement(input);
    return await this.saveElement(element);
  }

  /** Обновить Элемент документа */
  async updateElement(input: ElementUpdateInput) {
    await this.docElementRepository.update({ id: input.id }, { ...input });
    return this.findElementToId(input.id);
  }
  /** Получить элемент документа по id */
  async findElementToId(id: number): Promise<ElementEntity | null> {
    return await this.docElementRepository.findOne({ where: { id } });
  }

  /** Сохранить елемент документа */
  async saveElement(entity: ElementEntity): Promise<ElementEntity> {
    return await this.docElementRepository.save(entity);
  }

  /** Получить все елементы документа. */
  async getDocumentElements(documentId: number): Promise<ElementEntity[]> {
    return await this.docElementRepository.find({
      where: {
        document: {
          id: documentId,
        },
      },
    });
  }

  /** Получить объект репозитория книги заказа */
  getBookRepository(): Repository<BookEntity> {
    return this.bookRepository;
  }

  /** Получить объект репозитория документа книги. */
  getDocumentRepository(): Repository<DocumentEntity> {
    return this.documentRepository;
  }

  /** Получить объект репозитория документа книги. */
  getDocumentElementRepository(): Repository<ElementEntity> {
    return this.docElementRepository;
  }
}
