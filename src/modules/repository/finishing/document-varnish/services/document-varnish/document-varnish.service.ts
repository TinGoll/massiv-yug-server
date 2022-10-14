import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { DocumentVarnishEntity } from '../../entities/document-varnish.entity';
import {
  VarnishSampleEntity,
} from '../../entities/sample-varnish.entity';
import { VarnisCreateInput } from '../../inputs/varnish-create.input';
import { VarnishDocumentCreateInput } from '../../inputs/varnish-document-create.input';
import { VarnishDocumentUpdateInput } from '../../inputs/varnish-document-update.input';
import { PatinaUpdateInput } from '../../inputs/varnish-update.input';

@Injectable()
export class VarnishService {
  constructor(
    @InjectRepository(VarnishSampleEntity)
    private readonly varnishSampleEntityRepository: Repository<VarnishSampleEntity>,
    @InjectRepository(DocumentVarnishEntity)
    private readonly documentVarnishEntityRepository: Repository<DocumentVarnishEntity>,
  ) {}

  async createSample(input: VarnisCreateInput): Promise<VarnishSampleEntity> {
    try {
      if (!input.name) throw new WsException('Не указано название шаблона.');
      
      const candidate = await this.findSampleToName(input.name);

      if (candidate)
        throw new WsException('Шаблон с таким именем уже существует.');
      const sample = await this.varnishSampleEntityRepository.save({
        ...input,
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Удаление
  /** Удаление шаблона цвета (фиктивное) */
  async deleteSample(id: number): Promise<number> {
    try {
      await this.varnishSampleEntityRepository.update(
        { id },
        { deleted: true },
      );
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение шаблона лака по id (включая удаленные) */
  async findSample(id: number): Promise<VarnishSampleEntity | null> {
    try {
      const sample = await this.varnishSampleEntityRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение лака по имени, (исключая удаленные) */
  async findSampleToName(name: string): Promise<VarnishSampleEntity | null> {
    try {
      return (
        (await this.varnishSampleEntityRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение списка всех шаблонов цвета */
  async findAllSamples(): Promise<VarnishSampleEntity[]> {
    try {
      const samples = await this.varnishSampleEntityRepository.find({
        where: {
          deleted: false,
        },
      });
      return samples;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление шаблона лака */
  async updateSample(input: PatinaUpdateInput): Promise<VarnishSampleEntity> {
    try {
      const { id, ...updateData } = input;
      await this.varnishSampleEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.findSample(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание связующего звена для подключения к документу */
  async addDocumentNode(
    input: VarnishDocumentCreateInput,
  ): Promise<DocumentVarnishEntity> {
    const { documentId, sampleId, value = 0 } = input;
    const node = await this.documentVarnishEntityRepository.save({
      documentId,
      sampleId,
      value,
    });

    return node;
  }

  /** Обновления связующего звена для подключения к документу */
  async updateDocumentNode(
    input: VarnishDocumentUpdateInput,
  ): Promise<DocumentVarnishEntity> {
    const { id, ...updateData } = input;
    await this.documentVarnishEntityRepository.update(
      { id },
      { ...updateData },
    );
    return await this.documentVarnishEntityRepository.findOne({
      where: { id },
    });
  }
}
