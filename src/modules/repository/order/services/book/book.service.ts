import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { BookStatusEntity } from '../../entities/book-statuses.entity';
import { BookEntity } from '../../entities/book.entity';
import { DocumentEntity } from '../../entities/document.entity';
import { BookCreateInput, BookUpdateInput } from '../../inputs/book.input';
import { DocumentCreateInput } from '../../inputs/document.input';
import { DocumentService } from '../document/document.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(BookStatusEntity)
    private readonly bookStatusRepository: Repository<BookStatusEntity>,

    private readonly documentService: DocumentService,
  ) {}

  /** ************ Статус *********** */

  /** Создать сущность статуса */
  createStatus(input: { name: string; index?: number }): BookStatusEntity {
    return this.bookStatusRepository.create({ ...input });
  }

  /** Сохранить сущность */
  async saveStatus(entity: BookStatusEntity): Promise<BookStatusEntity> {
    return await this.bookStatusRepository.save(entity);
  }

  async findStatusToName (name: string): Promise<BookStatusEntity>  {
    return await this.bookStatusRepository.findOne({where: { name}});
  }

  /** ******************************* */

  async save(entity: BookEntity): Promise<BookEntity> {
    try {
      return await this.bookRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создать сущность, (не сохраненную в базу данных) */
  createBookEntity(input: BookCreateInput) {
    return this.bookRepository.create({ ...input });
  }

  async create(input: BookCreateInput): Promise<BookEntity> {
    try {
      const book = await this.bookRepository.save({ ...input });
      return book;
    } catch (e) {
      throw new WsException(e);
    }
  }
  async update(input: BookUpdateInput): Promise<BookEntity> {
    try {
      await this.bookRepository.update({ id: input.id }, { ...input });
      return await this.findOne(input.id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  async addDocument(
    orderId: number,
    documentInput: DocumentCreateInput,
  ): Promise<DocumentEntity> {
    try {
      const book = await this.findOne(orderId);
      if (!book) throw new WsException('Заказ не найден.');
      const document = await this.documentService.create(documentInput);
      book.documents.push(document);
      await this.bookRepository.save(book);
      return document;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async findOne(id: number): Promise<BookEntity | null> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      return book || null;
    } catch (e) {
      throw new WsException(e);
    }
  }
  async findAll(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.find();
    } catch (e) {
      throw new WsException(e);
    }
  }
}
