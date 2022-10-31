import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ElementEntity } from '../../entities/document-element.entity';
import { DocumentEntity } from '../../entities/document.entity';
import {
  DocumentCreateInput,
  DocumentUpdateInput,
} from '../../inputs/document.input';
import { ElementService } from '../element/element.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentEntityRepository: Repository<DocumentEntity>,
    private readonly elementService: ElementService,
  ) {}

  async save(entity: DocumentEntity): Promise<DocumentEntity> {
    try {
      return await this.documentEntityRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  createDocumentEntity(input: DocumentCreateInput): DocumentEntity {
    return this.documentEntityRepository.create({ ...input });
  }

  /** Создать новый документ */
  async create(input: DocumentCreateInput): Promise<DocumentEntity> {
    try {
      const document = await this.documentEntityRepository.save({ ...input });
      return document;
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Обновление документа */
  async update(input: DocumentUpdateInput): Promise<DocumentEntity> {
    try {
      await this.documentEntityRepository.update(
        { id: input.id },
        { ...input },
      );
      return await this.findOne(input.id);
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Добавление новго елемента, по имени шаблона */
  async addElement(id: number, sampleName: string): Promise<ElementEntity> {
    try {
      // Добавление элемента по названию шаблона
      const document = await this.findOne(id);
      if (!document) throw new WsException(`Документ с ID ${id} не найден.`);

      const element = await this.elementService.createElementToName(sampleName);
      document.elements.push(element);
      await this.documentEntityRepository.save(document);
      return element;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Поиск документа по id */
  async findOne(id: number): Promise<DocumentEntity | null> {
    try {
      const document = await this.documentEntityRepository.findOne({
        where: { id },
      });
      return document || null;
    } catch (e) {
      throw new WsException(e);
    }
  }
}
