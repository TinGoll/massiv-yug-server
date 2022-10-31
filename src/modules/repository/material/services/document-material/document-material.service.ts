import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { DocumentMaterialEntity } from '../../entities/document-material.entity';
import { MaterialSampleEntity } from '../../entities/sample-material.entity';

import { MaterialCreateInput } from '../../inputs/material-create.input';
import { MaterialDocumentCreateInput } from '../../inputs/material-document-create.input';
import { MaterialDocumentUpdateInput } from '../../inputs/material-document-update.input';
import { MaterialUpdateInput } from '../../inputs/material-update.input';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialSampleEntity)
    private readonly materialSampleEntityRepository: Repository<MaterialSampleEntity>,
    @InjectRepository(DocumentMaterialEntity)
    private readonly documentMaterialEntityRepository: Repository<DocumentMaterialEntity>,
  ) {}

  /** Создание нового шаблона */
  async createSample(
    input: MaterialCreateInput,
  ): Promise<MaterialSampleEntity> {
    try {
      if (!input.name) throw new WsException('Не указано название шаблона.');
      const candidate = await this.findSampleToName(input.name);
      if (candidate)
        throw new WsException('Шаблон с таким именем уже существует.');
      const sample = await this.materialSampleEntityRepository.save({
        ...input,
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление шаблона */
  async updateSample(
    input: MaterialUpdateInput,
  ): Promise<MaterialSampleEntity> {
    try {
      const { id, ...updateData } = input;
      await this.materialSampleEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.findSample(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Удаление шаблона */
  async deleteSample(id: number): Promise<number> {
    try {
      await this.materialSampleEntityRepository.update(
        { id },
        { deleted: true },
      );
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получнение списка шаблонов */
  async findAllSamples(): Promise<MaterialSampleEntity[]> {
    try {
      const samples = await this.materialSampleEntityRepository.find({
        where: {
          deleted: false,
        },
      });
      return samples;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получить один шаблон по id */
  async findSample(id: number): Promise<MaterialSampleEntity | null> {
    try {
      const sample = await this.materialSampleEntityRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получить один шаблон по названию */
  async findSampleToName(name: string): Promise<MaterialSampleEntity | null> {
    try {
      return (
        (await this.materialSampleEntityRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Создание связного узла с документом */
  addDocumentNode(input: MaterialDocumentCreateInput): DocumentMaterialEntity {
    try {
      const node = this.documentMaterialEntityRepository.create({
        ...input,
      });
      return node;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async saveDocumentNode(
    entity: DocumentMaterialEntity,
  ): Promise<DocumentMaterialEntity> {
    try {
      return await this.documentMaterialEntityRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление связного узла с документом */
  async updateDocumentNode(
    input: MaterialDocumentUpdateInput,
  ): Promise<DocumentMaterialEntity> {
    try {
      const { id, ...updateData } = input;
      await this.documentMaterialEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.documentMaterialEntityRepository.findOne({
        where: { id },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }
}
