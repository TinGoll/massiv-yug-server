import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleMaterialEntity } from './entities/sample.material.entity';
import {
  MaterialCreateInput,
  MaterialUpdateInput,
} from './inputs/material.input';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(SampleMaterialEntity)
    private readonly materialRepository: Repository<SampleMaterialEntity>,
  ) {}

  /** Создать новый материал */
  async create(input: MaterialCreateInput): Promise<SampleMaterialEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить материал */
  async update(input: MaterialUpdateInput): Promise<SampleMaterialEntity> {
    await this.materialRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить материал */
  async save(entity: SampleMaterialEntity): Promise<SampleMaterialEntity> {
    return await this.materialRepository.save(entity);
  }

  /** Удалить материал */
  async remove(id: number): Promise<number> {
    await this.materialRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект материала, не сохраненный в базу данных. */
  new(input: MaterialCreateInput): SampleMaterialEntity {
    return this.materialRepository.create({ ...input });
  }

  /** Поиск материала по id */
  async findToId(id: number): Promise<SampleMaterialEntity | null> {
    return await this.materialRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SampleMaterialEntity | null> {
    return await this.materialRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAll(): Promise<SampleMaterialEntity[]> {
    return await this.materialRepository.find();
  }

  /** Репозиторий материала */
  getRepository(): Repository<SampleMaterialEntity> {
    return this.materialRepository;
  }
}
