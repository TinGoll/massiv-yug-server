import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { DocumentProfileEntity } from '../../entities/document-profile.entity';
import { ProfileSampleEntity } from '../../entities/sample-profile.entity';
import { ProfileCreateInput } from '../../inputs/profile-create.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileSampleEntity)
    private readonly profileSampleEntityRepository: Repository<ProfileSampleEntity>,
    @InjectRepository(DocumentProfileEntity)
    private readonly documentProfileEntityRepository: Repository<DocumentProfileEntity>,
  ) {}

  /** Создание нового шаблона */
  async createSample(input: ProfileCreateInput): Promise<ProfileSampleEntity> {
    try {
      const candidate = await this.findSampleToName(input.name);
      if (candidate)
        throw new WsException('Шаблон с таким названием уже существует.');
      const sample = await this.profileSampleEntityRepository.save({
        ...input,
      });
      return sample;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получить один шаблон по id */
  async findSample(id: number): Promise<ProfileSampleEntity | null> {
    try {
      const sample = await this.profileSampleEntityRepository.findOne({
        where: { id },
      });
      return sample || null;
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получить один шаблон по названию */
  async findSampleToName(name: string): Promise<ProfileSampleEntity | null> {
    try {
      return (
        (await this.profileSampleEntityRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name) and deleted = false', { name })
          .getOne()) || null
      );
    } catch (e) {
      throw new WsException(e);
    }
  }

  /** Получнение списка шаблонов */
  async findAllSamples(): Promise<ProfileSampleEntity[]> {
    try {
      const samples = await this.profileSampleEntityRepository.find({
        where: {
          deleted: false,
        },
      });
      return samples;
    } catch (e) {
      throw new WsException(e);
    }
  }
}
