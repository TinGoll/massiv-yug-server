import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ColorConverterColerEntity } from '../../entities/color-coler.entity';
import { ColorConverterEntity } from '../../entities/color-converter.entity';
import { DocumentColorEntity } from '../../entities/document-color.entity';
import { ColorSampleEntity } from '../../entities/sample-color.entity';

import { ColerCreateInput } from '../../inputs/coler-create.input';
import { ColerUpdateInput } from '../../inputs/coler-update.input';
import { ColorDocumentCreateInput } from '../../inputs/color-documet-create.input';
import { ColorDocumentUpdateInput } from '../../inputs/color-documet-update.input';
import { ColorCreateSampleInput } from '../../inputs/color-sample-create.Input';
import { SampleUpdateInput } from '../../inputs/color-sample-update.input';
import { ConverterCreateInput } from '../../inputs/converter-create.input';
import { ConverterUpdateInput } from '../../inputs/converter-update.input';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorSampleEntity)
    private readonly colorSampleRepository: Repository<ColorSampleEntity>,
    @InjectRepository(ColorConverterEntity)
    private readonly colorConverterRepository: Repository<ColorConverterEntity>,
    @InjectRepository(ColorConverterColerEntity)
    private readonly colorConverterColerRepository: Repository<ColorConverterColerEntity>,
    @InjectRepository(DocumentColorEntity)
    private readonly documentColorRepository: Repository<DocumentColorEntity>,
  ) {}

  // Создание

  /** Создание шаблона цвета */
  async createSample(
    createInput: ColorCreateSampleInput,
  ): Promise<ColorSampleEntity> {
    try {
      if (!createInput.name)
        throw new WsException('Не указано название шаблона цвета.');

      const candidate = await this.findSampleToName(createInput.name);
      if (candidate)
        throw new WsException('Шаблон с таким именем уже существует.');

      const { converters = [], ...createData } = createInput;
      const savedConverters = await Promise.all(
        converters.map(async (c) => {
          return await this.createConverter(c);
        }),
      );

      const entity = this.colorSampleRepository.create(createData);
      entity.converters = savedConverters;

      const sample = await this.colorSampleRepository.save(entity);

      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание конвертера */
  async createConverter(
    createInput: ConverterCreateInput,
  ): Promise<ColorConverterEntity> {
    try {
      const { colers = [], ...crateData } = createInput;
      const savedColers = await Promise.all(
        colers.map(async (c) => {
          return await this.createColer(c);
        }),
      );
      const entity = this.colorConverterRepository.create(crateData);
      entity.colers = savedColers;
      const converter = await this.colorConverterRepository.save(entity);
      return converter;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Создание колера */
  async createColer(
    createInput: ColerCreateInput,
  ): Promise<ColorConverterColerEntity> {
    try {
      return await this.colorConverterColerRepository.save({ ...createInput });
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Обновление

  /** Обновление шаблона цвета */
  async updateSample(
    updateInput: SampleUpdateInput,
  ): Promise<ColorSampleEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.colorSampleRepository.update({ id }, { ...updateData });
      return await this.findSample(id);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление конвертера */
  async updateConverter(
    updateInput: ConverterUpdateInput,
  ): Promise<ColorConverterEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.colorConverterRepository.update({ id }, { ...updateData });
      return await this.colorConverterRepository.findOne({ where: { id } });
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление колера */
  async updateColer(
    updateInput: ColerUpdateInput,
  ): Promise<ColorConverterColerEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.colorConverterColerRepository.update(
        { id },
        { ...updateData },
      );
      return await this.colorConverterColerRepository.findOne({
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
      await this.colorSampleRepository.update({ id }, { deleted: true });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Удаление конвертера */
  async deleteConverter(id: number): Promise<number> {
    try {
      await this.colorConverterRepository.delete({ id });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }
  /** Удаление  конвертера */
  async deleteColer(id: number): Promise<number> {
    try {
      await this.colorConverterColerRepository.delete({ id });
      return id;
    } catch (e) {
      throw new WsException(e);
    }
  }

  // Поиск

  /** Получение списка всех шаблонов цвета */
  async findAllSamples(): Promise<ColorSampleEntity[]> {
    try {
      const samples = await this.colorSampleRepository.find({
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
  async findSample(id: number): Promise<ColorSampleEntity | null> {
    try {
      const sample = await this.colorSampleRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получение цвета по имени, (исключая удаленные) */
  async findSampleToName(name: string): Promise<ColorSampleEntity | null> {
    try {
      return (
        (await this.colorSampleRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }

  // **********************************************************************
  // создание поля документа (не сохранено в базу)
  addDocumentNode(
    createInput: ColorDocumentCreateInput,
  ): DocumentColorEntity {
    try {
      const { data = {}, value = 0, converterId, previousName } = createInput;

      const node = this.documentColorRepository.create({
        data,
        value,
        converterId,
        previousName,
      });

      return node;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async saveDocumentNode(
    entity: DocumentColorEntity,
  ): Promise<DocumentColorEntity> {
    try {
      return await this.documentColorRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Обновление узла документ - цвет */
  async updateDocumentNode(
    updateInput: ColorDocumentUpdateInput,
  ): Promise<DocumentColorEntity> {
    try {
      const { id, ...updateData } = updateInput;
      await this.documentColorRepository.update({ id }, { ...updateData });
      return await this.documentColorRepository.findOne({ where: { id } });
    } catch (e) {
      throw new WsException(e);
    }
  }
}
