import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { BookEntity } from '../../entities/book.entity';
import { DocumentEntity } from '../../entities/document.entity';
import { ElementSampleEntity } from '../../entities/sample-element.entity';
import { CreateBookInput } from '../../inputs/book.input';
import { CreateDocumentInput } from '../../inputs/document.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    @InjectRepository(ElementSampleEntity)
    private readonly elementRepository: Repository<ElementSampleEntity>,
  ) {}

  /*************************************************************************** */
  /** Создание новой книги */
  async createBook(input: CreateBookInput): Promise<BookEntity> {
    try {
      const book = await this.bookRepository.save({ ...input });
      return book;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание новой книги */
  async createDocument(input: CreateDocumentInput): Promise<DocumentEntity> {
    try {
      const document = await this.documentRepository.save({ ...input });
      return document;
    } catch (e) {
      throw new WsException(e);
    }
  }


}
