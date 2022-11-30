import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorEntity } from './entities/sector.entity';
import { SectorCreateInput, SectorUpdateInput } from './inputs/sector.input';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
  ) {}

  /** Создать новый профиль */
  async create(input: SectorCreateInput): Promise<SectorEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить профиль */
  async update(input: SectorUpdateInput): Promise<SectorEntity> {
    await this.sectorRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить профиль */
  async save(entity: SectorEntity): Promise<SectorEntity> {
    return await this.sectorRepository.save(entity);
  }

  /** Удалить профиль */
  async remove(id: number): Promise<number> {
    await this.sectorRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект профиля, не сохраненный в базу данных. */
  new(input: SectorCreateInput): SectorEntity {
    return this.sectorRepository.create({ ...input });
  }

  /** Поиск профиля по id */
  async findToId(id: number): Promise<SectorEntity | null> {
    return await this.sectorRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SectorEntity | null> {
    return await this.sectorRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAll(): Promise<SectorEntity[]> {
    return await this.sectorRepository.find();
  }

  /** Репозиторий профиля */
  getRepository(): Repository<SectorEntity> {
    return this.sectorRepository;
  }
}
