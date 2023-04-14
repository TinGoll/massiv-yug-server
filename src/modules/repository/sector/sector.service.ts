import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorEntity } from './entities/sector.entity';
import { SectorCreateInput, SectorUpdateInput } from './inputs/sector.input';
import { WorkService } from '../work/work.service';
import { SampleWorkEntity } from '../work/entities/sample.work.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
    private readonly workService: WorkService,
  ) {}

  /** Создать новый профиль */
  async create(input: SectorCreateInput): Promise<SectorEntity> {
    const { works = [], ...data } = input;
    const entity = this.new({ ...data });
    const sampleWorks: SampleWorkEntity<string>[] = [];
    for (const key of works) {
      const work = await this.workService.findToName<string>(key);
      if (work) {
        sampleWorks.push(work);
      }
    }
    entity.works = sampleWorks;
    await this.save(entity);
    return entity;
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
    const { works, ...data } = input;
    return this.sectorRepository.create({ ...data });
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
