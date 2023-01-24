import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatinaConverterColerEntity } from './entities/patina.converter.coler';
import { PatinaConverterEntity } from './entities/patina.converters.entity';
import { SamplePatinaEntity } from './entities/sample.patina.entity';
import {
  PatinaColerCreateInput,
  PatinaColerUpdateInput,
} from './inputs/patina.coler.input';
import {
  PatinaConverterCreateInput,
  PatinaConverterUpdateInput,
} from './inputs/patina.converter.input';
import { PatinaCreateInput, PatinaUpdateInput } from './inputs/patina.input';

@Injectable()
export class PatinaService {
  constructor(
    @InjectRepository(SamplePatinaEntity)
    private readonly patinaRepository: Repository<SamplePatinaEntity>,
    @InjectRepository(PatinaConverterEntity)
    private readonly converterRepository: Repository<PatinaConverterEntity>,
    @InjectRepository(PatinaConverterColerEntity)
    private readonly colerRepository: Repository<PatinaConverterColerEntity>,
  ) {}

  /** Создать новый патина */
  async createPatina(input: PatinaCreateInput): Promise<SamplePatinaEntity> {
    const entity = this.newPatina({ ...input });
    return await this.savePatina(entity);
  }
  /** Обновить патина */
  async updatePatina(input: PatinaUpdateInput): Promise<SamplePatinaEntity> {
    await this.patinaRepository.update({ id: input.id }, { ...input });
    return await this.findPatinaToId(input.id);
  }
  /** Сохранить патина */
  async savePatina(entity: SamplePatinaEntity): Promise<SamplePatinaEntity> {
    return await this.patinaRepository.save(entity);
  }
  /** Удалить патину */
  async removePatina(id: number): Promise<number> {
    await this.patinaRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект патина, не сохраненный в базу данных. */
  newPatina(input: PatinaCreateInput): SamplePatinaEntity {
    return this.patinaRepository.create({ ...input });
  }

  /** Поиск патины по id */
  async findPatinaToId(id: number): Promise<SamplePatinaEntity | null> {
    return await this.patinaRepository.findOne({ where: { id } });
  }

  async findPatinaToName(name: string): Promise<SamplePatinaEntity | null> {
    return await this.patinaRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findPatinas(): Promise<SamplePatinaEntity[]> {
    return await this.patinaRepository.find();
  }

  /** Создать новый конвертер */
  async createConverter(
    input: PatinaConverterCreateInput,
  ): Promise<PatinaConverterEntity> {
    const entity = this.newConverter({ ...input });
    return await this.saveConverter(entity);
  }
  /** Обновить конвертер */
  async updateConverter(
    input: PatinaConverterUpdateInput,
  ): Promise<PatinaConverterEntity> {
    await this.converterRepository.update({ id: input.id }, { ...input });
    return await this.findConverterToId(input.id);
  }
  /** Сохранить конвертер */
  async saveConverter(
    entity: PatinaConverterEntity,
  ): Promise<PatinaConverterEntity> {
    return await this.converterRepository.save(entity);
  }

  /** Удалить конвертер */
  async removeConverter(id: number): Promise<number> {
    await this.converterRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект конвертера, не сохраненный в базу данных. */
  newConverter(input: PatinaConverterCreateInput): PatinaConverterEntity {
    return this.converterRepository.create({ ...input });
  }

  /** Поиск конвертера по id */
  async findConverterToId(id: number): Promise<PatinaConverterEntity | null> {
    return await this.converterRepository.findOne({ where: { id } });
  }

  /**Создать колер */
  async createColer(
    input: PatinaColerCreateInput,
  ): Promise<PatinaConverterColerEntity> {
    const entity = this.newColer({ ...input });
    return await this.saveColer(entity);
  }
  /**Обновить колер */
  async updateColer(
    input: PatinaColerUpdateInput,
  ): Promise<PatinaConverterColerEntity> {
    await this.colerRepository.update({ id: input.id }, { ...input });
    return await this.findColerToId(input.id);
  }
  /**Сохранить колер */
  async saveColer(
    entity: PatinaConverterColerEntity,
  ): Promise<PatinaConverterColerEntity> {
    return await this.colerRepository.save(entity);
  }
  /**Удалить колер */
  async removeColer(id: number): Promise<number> {
    await this.colerRepository.delete(id);
    return id;
  }

  /** Создает новый обект колера, не сохраненный в базу данных. */
  newColer(input: PatinaColerCreateInput): PatinaConverterColerEntity {
    return this.colerRepository.create({ ...input });
  }

  /** Поиск колера по id */
  async findColerToId(id: number): Promise<PatinaConverterColerEntity | null> {
    return await this.colerRepository.findOne({ where: { id } });
  }

  /** Репозиторий цвета */
  getColorRepository(): Repository<SamplePatinaEntity> {
    return this.patinaRepository;
  }
}
