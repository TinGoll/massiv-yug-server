import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SamplePanelEntity } from './entities/sample.panel.entity';
import { PanelCreateInput, PanelUpdateInput } from './inputs/panel.input';


@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(SamplePanelEntity)
    private readonly panelRepository: Repository<SamplePanelEntity>,
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
    return await this.panelRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SamplePanelEntity | null> {
    return await this.panelRepository.findOne({
      where: { name, deleted: false },
    });
  }

  async findAll(): Promise<SamplePanelEntity[]> {
    return await this.panelRepository.find();
  }

  /** Репозиторий материала */
  getRepository(): Repository<SamplePanelEntity> {
    return this.panelRepository;
  }
}
