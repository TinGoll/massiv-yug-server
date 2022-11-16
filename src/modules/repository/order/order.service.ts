import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { PersonEntity } from '../person/entities/person.entity';
import { SampleColorEntity } from '../color/entities/sample.color.entity';
import { SamplePatinaEntity } from '../patina/entities/sample.patina.entity';
import { SampleVarnishEntity } from '../varnish/entities/sample.varnish.entity';
import { SampleMaterialEntity } from '../material/entities/sample.material.entity';
import { SamplePanelEntity } from '../panel/entities/sample.panel.entity';
import { SampleProfileEntity } from '../profile/entities/sample.profile.entity';

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
  ) {}

  /** Создать новый статус книги */
  async createStatus(input: BookStatusCreateInput): Promise<BookStatusEntity> {
    const candidate = this.findStatusToName(input.name);
    if (candidate) throw new Error('Статус с таким названием уже существует.');
    const status = this.statusRepository.create({ ...input });
    await this.statusRepository.save(status);
    return status;
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
    return await this.bookRepository.findOne({ where: { id } });
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
  // Дополнительные поля книги.
  async assignStatusToBook(
    bookId: number,
    status: BookStatusEntity,
  ): Promise<BookStatusEntity> {
    const book = await this.findBookToId(bookId);
    if (!book) throw new Error('Заказ с таким id не существует.');
    book.status = status;
    await this.saveBook(book);
    return status;
  }
  async assignClientToBook(
    bookId: number,
    client: PersonEntity,
  ): Promise<PersonEntity> {
    const book = await this.findBookToId(bookId);
    if (!book) throw new Error('Заказ с таким id не существует.');
    book.client = client;
    await this.saveBook(book);
    return client;
  }
  async assignAuthorToBook(
    bookId: number,
    author: PersonEntity,
  ): Promise<PersonEntity> {
    const book = await this.findBookToId(bookId);
    if (!book) throw new Error('Заказ с таким id не существует.');
    book.author = author;
    await this.saveBook(book);
    return author;
  }

  // Дополнительные поля документа.
  /** Присвоить цвет */
  async assignColor(
    documentId: number,
    color: SampleColorEntity | null,
    options: Partial<Omit<DocumentColorEntity, 'id' | 'sample'>>,
  ): Promise<DocumentColorEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');
    if (!document.color) {
      const docColor = this.docColorRepository.create();
      await this.docColorRepository.save(docColor);
      document.color = docColor;
      await this.saveDocument(document);
    }
    await this.docColorRepository.update(
      { id: document.color.id },
      { ...options },
    );
    document.color.sample = color;
    return await this.docColorRepository.save(document.color);
  }
  /** Присовеить патину */
  async assignPatina(
    documentId: number,
    patina: SamplePatinaEntity | null,
    options: Partial<Omit<DocumentPatinaEntity, 'id' | 'sample'>>,
  ): Promise<DocumentPatinaEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');
    if (!document.patina) {
      const docPatina = this.docPatinaRepository.create();
      await this.docPatinaRepository.save(docPatina);
      document.patina = docPatina;
      await this.saveDocument(document);
    }
    await this.docPatinaRepository.update(
      { id: document.patina.id },
      { ...options },
    );
    document.patina.sample = patina;
    return await this.docPatinaRepository.save(document.patina);
  }
  /** Присвоить лак */
  async assignVarnish(
    documentId: number,
    varnish: SampleVarnishEntity | null,
    options: Partial<Omit<DocumentVarnishEntity, 'id' | 'sample'>>,
  ): Promise<DocumentVarnishEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');
    if (!document.varnish) {
      const docVarnish = this.docVarnishRepository.create();
      await this.docVarnishRepository.save(docVarnish);
      document.varnish = docVarnish;
      await this.saveDocument(document);
    }
    await this.docVarnishRepository.update(
      { id: document.varnish.id },
      { ...options },
    );
    document.varnish.sample = varnish;
    return await this.docVarnishRepository.save(document.varnish);
  }

  /** Присвоить материал */
  async assignMaterial(
    documentId: number,
    material: SampleMaterialEntity | null,
  ): Promise<SampleMaterialEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');
    document.material = material;
    await this.saveDocument(document);
    return document.material;
  }

  /** Присвоить филёнку */
  async assignPanel(
    documentId: number,
    panel: SamplePanelEntity | null,
    options: Partial<Omit<DocumentPanelEntity, 'id' | 'sample'>>,
  ): Promise<DocumentPanelEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');

    if (!document.panel) {
      const docPanel = this.docPanelRepository.create();
      await this.docPanelRepository.save(docPanel);
      document.panel = docPanel;
      await this.saveDocument(document);
    }
    await this.docPanelRepository.update(
      { id: document.panel.id },
      { ...options },
    );
    document.panel.sample = panel;
    return await this.docPanelRepository.save(document.panel);
  }
  /** Присвоить профиль */
  async assignProfile(
    documentId: number,
    profile: SampleProfileEntity,
    options: Partial<Omit<DocumentProfileEntity, 'id' | 'sample'>>,
  ): Promise<DocumentProfileEntity> {
    const document = await this.findDocumentToId(documentId);
    if (!document)
      throw new Error('Документ с таким id не найден в базе данным');
    if (!document.profile) {
      const docProfile = this.docProfileRepository.create();
      await this.docProfileRepository.save(docProfile);
      document.profile = docProfile;
      await this.saveDocument(document);
    }
    await this.docProfileRepository.update(
      { id: document.profile.id },
      { ...options },
    );
    document.profile.sample = profile;
    return await this.docProfileRepository.save(document.profile);
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

  async findSampleElementToId(id: number): Promise<SampleElementEntity | null> {
    return this.elementRepository.findOne({ where: { id } });
  }

  async findSampleElementToName(
    name: string,
  ): Promise<SampleElementEntity | null> {
    return await this.elementRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

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
}
