import { Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ColorConverterEntity } from './entities/color.converter.entity';
import { ColorConverterColerEntity } from './entities/converter.coler.entity';
import { SampleColorEntity } from './entities/sample.color.entity';
import { ColerCreateInput, ColerUpdateInput } from './inputs/coler.input';
import { ColorCreateInput, ColorUpdateInput } from './inputs/color.input';
import {
  ColorConverterCreateInput,
  ColorConverterUpdateInput,
} from './inputs/converter.input';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(SampleColorEntity)
    private readonly colorRepository: Repository<SampleColorEntity>,
    @InjectRepository(ColorConverterEntity)
    private readonly converterRepository: Repository<ColorConverterEntity>,
    @InjectRepository(ColorConverterColerEntity)
    private readonly colerRepository: Repository<ColorConverterColerEntity>,
  ) {}

  /** Создать новый цвет */
  async createColor(input: ColorCreateInput): Promise<SampleColorEntity> {
    const entity = this.newColor({ ...input });
    return await this.saveColor(entity);
  }
  /** Обновить цвет */
  async updateColor(input: ColorUpdateInput): Promise<SampleColorEntity> {
    await this.colorRepository.update({ id: input.id }, { ...input });
    return await this.findColorToId(input.id);
  }
  /** Сохранить цвет */
  async saveColor(entity: SampleColorEntity): Promise<SampleColorEntity> {
    return await this.colorRepository.save(entity);
  }
  /** Удалить цвет */
  async removeColor(id: number): Promise<number> {
    await this.colorRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект цвета, не сохраненный в базу данных. */
  newColor(input: ColorCreateInput): SampleColorEntity {
    return this.colorRepository.create({ ...input });
  }

  /** Поиск цвета по id */
  async findColorToId(id: number): Promise<SampleColorEntity | null> {
    return await this.colorRepository.findOne({ where: { id } });
  }

  async findColorToName(name: string): Promise<SampleColorEntity | null> {
    return await this.colorRepository.findOne({
      where: { name, deleted: false },
    });
  }

  async findColors(): Promise<SampleColorEntity[]> {
    return await this.colorRepository.find();
  }

  /** Создать новый конвертер */
  async createConverter(
    input: ColorConverterCreateInput,
  ): Promise<ColorConverterEntity> {
    const entity = this.newConverter({ ...input });
    return await this.saveConverter(entity);
  }
  /** Обновить конвертер */
  async updateConverter(
    input: ColorConverterUpdateInput,
  ): Promise<ColorConverterEntity> {
    await this.converterRepository.update({ id: input.id }, { ...input });
    return await this.findConverterToId(input.id);
  }
  /** Сохранить конвертер */
  async saveConverter(
    entity: ColorConverterEntity,
  ): Promise<ColorConverterEntity> {
    return await this.converterRepository.save(entity);
  }
  /** Удалить конвертер */
  async removeConverter(id: number): Promise<number> {
    await this.converterRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект конвертера, не сохраненный в базу данных. */
  newConverter(input: ColorConverterCreateInput): ColorConverterEntity {
    return this.converterRepository.create({ ...input });
  }

  /** Поиск конвертера по id */
  async findConverterToId(id: number): Promise<ColorConverterEntity | null> {
    return await this.converterRepository.findOne({ where: { id } });
  }

  /**Создать колер */
  async createColer(
    input: ColerCreateInput,
  ): Promise<ColorConverterColerEntity> {
    const entity = this.newColer({ ...input });
    return await this.saveColer(entity);
  }
  /**Обновить колер */
  async updateColer(
    input: ColerUpdateInput,
  ): Promise<ColorConverterColerEntity> {
    await this.colorRepository.update({ id: input.id }, { ...input });
    return await this.findColerToId(input.id);
  }
  /**Сохранить колер */
  async saveColer(
    entity: ColorConverterColerEntity,
  ): Promise<ColorConverterColerEntity> {
    return await this.colerRepository.save(entity);
  }
  /**Удалить колер */
  async removeColer(id: number): Promise<number> {
    await this.colerRepository.delete(id);
    return id;
  }

  /** Создает новый обект колера, не сохраненный в базу данных. */
  newColer(input: ColerCreateInput): ColorConverterColerEntity {
    return this.colerRepository.create({ ...input });
  }

  /** Поиск колера по id */
  async findColerToId(id: number): Promise<ColorConverterColerEntity | null> {
    return await this.colerRepository.findOne({ where: { id } });
  }

  /** Репозиторий цвета */
  getColorRepository(): Repository<SampleColorEntity> {
    return this.colorRepository;
  }
}
