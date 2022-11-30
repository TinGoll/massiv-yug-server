import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleVarnishEntity } from './entities/sample.varnish.entity';
import { VarnishCreateInput, VarnishUpdateInput } from './inputs/varnish.input';

@Injectable()
export class VarnishService {
  constructor(
    @InjectRepository(SampleVarnishEntity)
    private readonly varnishRepository: Repository<SampleVarnishEntity>,
  ) {}

  /** Создать новый профиль */
  async create(input: VarnishCreateInput): Promise<SampleVarnishEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить профиль */
  async update(input: VarnishUpdateInput): Promise<SampleVarnishEntity> {
    await this.varnishRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить профиль */
  async save(entity: SampleVarnishEntity): Promise<SampleVarnishEntity> {
    return await this.varnishRepository.save(entity);
  }

  /** Удалить профиль */
  async remove(id: number): Promise<number> {
    await this.varnishRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект профиля, не сохраненный в базу данных. */
  new(input: VarnishCreateInput): SampleVarnishEntity {
    return this.varnishRepository.create({ ...input });
  }

  /** Поиск профиля по id */
  async findToId(id: number): Promise<SampleVarnishEntity | null> {
    return await this.varnishRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SampleVarnishEntity | null> {
    return await this.varnishRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAll(): Promise<SampleVarnishEntity[]> {
    return await this.varnishRepository.find();
  }

  /** Репозиторий профиля */
  getRepository(): Repository<SampleVarnishEntity> {
    return this.varnishRepository;
  }
}
