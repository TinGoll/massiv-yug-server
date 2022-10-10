import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { PatinaConverterColerEntity } from '../../entities/coler-patina.entity';
import { PatinaConverterEntity } from '../../entities/converter-patina.entity';
import { DocumentPatinaEntity } from '../../entities/document-patina.entity';
import { PatinaSampleEntity } from '../../entities/sample-patina.entity';

import {
  PatinaCreateInput,
  PatinaConverterCreateInput,
  PatinaColerCreateInput,
} from '../../inputs/patina-create.input';
import {
  PatinaUpdateInput,
  PatinaConverterUpdateInput,
  PatinaColerUpdateInput,
} from '../../inputs/patina-update.input';

@Injectable()
export class PatinaService {
  constructor(
    @InjectRepository(PatinaSampleEntity)
    private readonly patinaSampleEntityRepository: Repository<PatinaSampleEntity>,
    @InjectRepository(PatinaConverterEntity)
    private readonly patinaConverterEntityRepository: Repository<PatinaConverterEntity>,
    @InjectRepository(PatinaConverterColerEntity)
    private readonly patinaConverterColerEntityRepository: Repository<PatinaConverterColerEntity>,
    @InjectRepository(DocumentPatinaEntity)
    private readonly documentPatinaEntityRepository: Repository<DocumentPatinaEntity>,
  ) {}

  // Создание

  /** Создание шаблона цвета */
  async createSample(
    createInput: PatinaCreateInput,
  ): Promise<PatinaSampleEntity> {
    try {
      if (!createInput.name)
        throw new WsException('Не указано название шаблона патины.');
      const candidate = await this.findSampleToName(createInput.name);
      if (candidate)
        throw new WsException('Шаблон с таким именем уже существует.');

      const { converters, ...createData } = createInput;
      const savedConverters = await Promise.all(
        converters.map(async (c) => await this.createConverter(c)),
      );
      const entity = this.patinaSampleEntityRepository.create(createData);
      entity.converters = savedConverters;
      const sample = await this.patinaSampleEntityRepository.save(entity);
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание конвертера */
  async createConverter(
    createInput: PatinaConverterCreateInput,
  ): Promise<PatinaConverterEntity> {
    try {
      const { colers = [], ...crateData } = createInput;
      const savedColers = await Promise.all(
        colers.map(async (c) => {
          return await this.createColer(c);
        }),
      );
      const entity = this.patinaConverterEntityRepository.create(crateData);
      entity.colers = savedColers;
      const converter = await this.patinaConverterEntityRepository.save(entity);
      return converter;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание колера */
  async createColer(
    createInput: PatinaColerCreateInput,
  ): Promise<PatinaConverterColerEntity> {
    try {
      return await this.patinaConverterColerEntityRepository.save({
        ...createInput,
      });
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Обновление

  /** Обновление шаблона цвета */
  async updateSample(
    updateInput: PatinaUpdateInput,
  ): Promise<PatinaSampleEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.patinaSampleEntityRepository.update({ id }, { ...updateData });
      return await this.findSample(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление конвертера */
  async updateConverter(
    updateInput: PatinaConverterUpdateInput,
  ): Promise<PatinaConverterEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.patinaConverterEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.patinaConverterEntityRepository.findOne({
        where: { id },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление колера */
  async updateColer(
    updateInput: PatinaColerUpdateInput,
  ): Promise<PatinaConverterColerEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.patinaConverterColerEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.patinaConverterColerEntityRepository.findOne({
        where: { id },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Удаление
  /** Удаление шаблона цвета (фиктивное) */
  async deleteSample(id: number): Promise<number> {
    try {
      await this.patinaSampleEntityRepository.update({ id }, { deleted: true });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Удаление конвертера */
  async deleteConverter(id: number): Promise<number> {
    try {
      await this.patinaConverterEntityRepository.delete({ id });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Удаление  конвертера */
  async deleteColer(id: number): Promise<number> {
    try {
      await this.patinaConverterColerEntityRepository.delete({ id });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Поиск

  /** Получение списка всех шаблонов цвета */
  async findAllSamples(): Promise<PatinaSampleEntity[]> {
    try {
      const samples = await this.patinaSampleEntityRepository.find({
        where: {
          deleted: false,
        },
      });
      return samples;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение шаблона цвета по id (включая удаленные) */
  async findSample(id: number): Promise<PatinaSampleEntity | null> {
    try {
      const sample = await this.patinaSampleEntityRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение цвета по имени, (исключая удаленные) */
  async findSampleToName(name: string): Promise<PatinaSampleEntity | null> {
    try {
      return (
        (await this.patinaSampleEntityRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }

  // **********************************************************************
  // создание поля документа
  async addDocumentNode(createInput: any): Promise<DocumentPatinaEntity> {
    try {
      const {
        documentId,
        sampleId,
        data = {},
        value = 0,
        converterId,
      } = createInput;

      const node = await this.documentPatinaEntityRepository.save({
        documentId,
        sampleId,
        data,
        value,
        converterId,
      });

      return node;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление узла документ - цвет */
  async updateDocumentNode(updateInput: any): Promise<DocumentPatinaEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.documentPatinaEntityRepository.update(
        { id },
        { ...updateData },
      );
      return await this.documentPatinaEntityRepository.findOne({
        where: { id },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }
}
