import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SamplePanelEntity } from './entities/sample.panel.entity';
import { SampleShirtEntity } from './entities/sample.panel.shirt.entity';
import { PanelCreateInput, PanelUpdateInput } from './inputs/panel.input';
import { ShirtCreateInput, ShirtUpdateInput } from './inputs/shirt.inputs';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(SamplePanelEntity)
    private readonly panelRepository: Repository<SamplePanelEntity>,
    @InjectRepository(SampleShirtEntity)
    private readonly shirtRepository: Repository<SampleShirtEntity>,
  ) {}

  /** Создать новый материал */
  async create(input: PanelCreateInput): Promise<SamplePanelEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить материал */
  async update(input: PanelUpdateInput): Promise<SamplePanelEntity> {
    await this.panelRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить материал */
  async save(entity: SamplePanelEntity): Promise<SamplePanelEntity> {
    return await this.panelRepository.save(entity);
  }

  /** Удалить материал */
  async remove(id: number): Promise<number> {
    await this.panelRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект материала, не сохраненный в базу данных. */
  new(input: PanelCreateInput): SamplePanelEntity {
    return this.panelRepository.create({ ...input });
  }

  /** Поиск материала по id */
  async findToId(id: number): Promise<SamplePanelEntity | null> {
    return await this.panelRepository.findOne({
      where: { id },
    });
  }

  async findToName(name: string): Promise<SamplePanelEntity | null> {
    return await this.panelRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAll(): Promise<SamplePanelEntity[]> {
    return await this.panelRepository.find();
  }

  /** Создание рубашки. */
  async createShirt(input: ShirtCreateInput): Promise<SampleShirtEntity> {
    const entity = this.shirtRepository.create({ ...input });
    return await this.shirtRepository.save(entity);
  }

  /** Обновление рубашки. */
  async updateShirt(input: ShirtUpdateInput): Promise<SampleShirtEntity> {
    await this.shirtRepository.update({ id: input.id }, { ...input });
    return await this.shirtRepository.findOne({ where: { id: input.id } });
  }

  /** Поиск рубашки по названию */
  async findShirtToName(name: string): Promise<SampleShirtEntity> {
    return await this.shirtRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  /** Поиск рубашки по id */
  async findShirtToId(id: number): Promise<SampleShirtEntity> {
    return await this.shirtRepository.findOne({ where: { id } });
  }

  /** Репозиторий филёнок */
  getRepository(): Repository<SamplePanelEntity> {
    return this.panelRepository;
  }
  /** Репозиторий рубашек */
  getShirtRepository(): Repository<SampleShirtEntity> {
    return this.shirtRepository;
  }
}
