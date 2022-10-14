import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { SettingEntity } from '../../entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingEntityRepository: Repository<SettingEntity>,
  ) {}

  /** Присвоить значение настройке, по названию */
  async set<T extends object = any>(name: string, value: T): Promise<void> {
    try {
      const candidate = await this.settingEntityRepository.findOne({
        where: { name },
      });
      if (candidate) {
        await this.settingEntityRepository.update(
          { id: candidate.id },
          { value },
        );
      } else {
        await this.settingEntityRepository.save({ name, value });
      }
    } catch (e) {
      throw new WsException(e);
    }
  }

  /**
   * Получить значение по названию.
   * @param name   Название параметра
   * @param defaultValue В случае, если не найдено, будет использовано значение по умолчанию.
   */
  async get<T extends object = any>(name: string, defaultValue: T): Promise<T> {
    try {
        const candidate = await this.settingEntityRepository.findOne({
          where: { name },
        });
        if (!candidate) {
            await this.set(name, defaultValue);
            return defaultValue;
        }
        return candidate.value as T
    } catch (e) {
      throw new WsException(e);
    }
  }

  
}
