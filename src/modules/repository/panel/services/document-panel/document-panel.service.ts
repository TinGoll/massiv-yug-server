import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { DocumentPanelEntity } from '../../entities/document-panel.entity';
import { PanelSampleEntity } from '../../entities/sample-panel.entity';
import { PanelCreateInput } from '../../inputs/panel-create.input';
import { PanelDocumentCreateInput } from '../../inputs/panel-document-create.input';
import { PanelDocumentUpdateInput } from '../../inputs/panel-document-update.input';
import { PanelUpdateInput } from '../../inputs/panel-update.input';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelSampleEntity)
    private readonly panelSampleEntityRepository: Repository<PanelSampleEntity>,
    @InjectRepository(DocumentPanelEntity)
    private readonly documentPanelEntityRepository: Repository<DocumentPanelEntity>,
  ) {}

  /** Создание нового шаблона */
  async createSample(input: PanelCreateInput): Promise<PanelSampleEntity> {
    try {
      if (!input.name) throw new WsException('Не указано название шаблона.');
      const candidate = await this.findSampleToName(input.name);
      if (candidate)
        throw new WsException('Шаблон с таким именем уже существует.');
      const sample = await this.panelSampleEntityRepository.save({
        ...input,
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление шаблона */
  async updateSample(input: PanelUpdateInput): Promise<PanelSampleEntity> {
    try {
      const { id, ...updateData } = input;
      await this.panelSampleEntityRepository.update({ id }, { ...updateData });
      return await this.findSample(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Удаление шаблона */
  async deleteSample(id: number): Promise<number> {
    try {
      await this.panelSampleEntityRepository.update({ id }, { deleted: true });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получнение списка шаблонов */
  async findAllSamples(): Promise<PanelSampleEntity[]> {
    try {
      const samples = await this.panelSampleEntityRepository.find({
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
  async findSample(id: number): Promise<PanelSampleEntity | null> {
    try {
      const sample = await this.panelSampleEntityRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получить один шаблон по названию */
  async findSampleToName(name: string): Promise<PanelSampleEntity | null> {
    try {
      return (
        (await this.panelSampleEntityRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание связного узла с документом */
  async addDocumentNode(
    input: PanelDocumentCreateInput,
  ): Promise<DocumentPanelEntity> {
    try {
      const node = await this.documentPanelEntityRepository.save({
        ...input,
      });
      return node;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление связного узла с документом */
  async updateDocumentNode(
    input: PanelDocumentUpdateInput,
  ): Promise<DocumentPanelEntity> {
    try {
      const { id, ...updateData } = input;
      await this.documentPanelEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.documentPanelEntityRepository.findOne({
        where: { id },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }
}
