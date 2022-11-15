import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleWorkEntity } from './entities/sample.work.entity';
import { WorkCreateInput, WorkUpdateInput } from './inputs/work.input';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(SampleWorkEntity)
    private readonly workRepository: Repository<SampleWorkEntity>,
  ) {}

  /** Создать новый профиль */
  async create(input: WorkCreateInput): Promise<SampleWorkEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить профиль */
  async update(input: WorkUpdateInput): Promise<SampleWorkEntity> {
    await this.workRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить профиль */
  async save(entity: SampleWorkEntity): Promise<SampleWorkEntity> {
    return await this.workRepository.save(entity);
  }

  /** Удалить профиль */
  async remove(id: number): Promise<number> {
    await this.workRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект профиля, не сохраненный в базу данных. */
  new(input: WorkCreateInput): SampleWorkEntity {
    return this.workRepository.create({ ...input });
  }

  /** Поиск профиля по id */
  async findToId(id: number): Promise<SampleWorkEntity | null> {
    return await this.workRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SampleWorkEntity | null> {
    return await this.workRepository.findOne({
      where: { name, deleted: false },
    });
  }

  async findAll(): Promise<SampleWorkEntity[]> {
    return await this.workRepository.find();
  }

  /** Репозиторий профиля */
  getRepository(): Repository<SampleWorkEntity> {
    return this.workRepository;
  }
}
