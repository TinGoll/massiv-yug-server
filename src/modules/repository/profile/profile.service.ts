import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleProfileEntity } from './entities/sample.profile.entity';
import { ProfileCreateInput, ProfileUpdateInput } from './inputs/profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(SampleProfileEntity)
    private readonly profileRepository: Repository<SampleProfileEntity>,
  ) {}

  /** Создать новый профиль */
  async create(input: ProfileCreateInput): Promise<SampleProfileEntity> {
    const entity = this.new({ ...input });
    return await this.save(entity);
  }

  /** Обновить профиль */
  async update(input: ProfileUpdateInput): Promise<SampleProfileEntity> {
    await this.profileRepository.update({ id: input.id }, { ...input });
    return await this.findToId(input.id);
  }

  /** Сохранить профиль */
  async save(entity: SampleProfileEntity): Promise<SampleProfileEntity> {
    return await this.profileRepository.save(entity);
  }

  /** Удалить профиль */
  async remove(id: number): Promise<number> {
    await this.profileRepository.update({ id }, { deleted: true });
    return id;
  }

  /** Создает новый обект профиля, не сохраненный в базу данных. */
  new(input: ProfileCreateInput): SampleProfileEntity {
    return this.profileRepository.create({ ...input });
  }

  /** Поиск профиля по id */
  async findToId(id: number): Promise<SampleProfileEntity | null> {
    return await this.profileRepository.findOne({ where: { id } });
  }

  async findToName(name: string): Promise<SampleProfileEntity | null> {
    return await this.profileRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
      .getOne();
  }

  async findAll(): Promise<SampleProfileEntity[]> {
    return await this.profileRepository.find();
  }

  /** Репозиторий профиля */
  getRepository(): Repository<SampleProfileEntity> {
    return this.profileRepository;
  }
}
