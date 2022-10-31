import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { SectorEntity } from '../../entities/sector-entity';
import { CreateSectorInput } from '../../imputs/create-sector.input';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorEntityRepository: Repository<SectorEntity>,
  ) {}

  create(input: CreateSectorInput): SectorEntity {
    try {
      const entity = this.sectorEntityRepository.create({ ...input });
      return entity;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async save(entity: SectorEntity): Promise<SectorEntity> {
    try {
      return await this.sectorEntityRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }

  async findToName(name: string): Promise<SectorEntity | null> {
    try {
      return await this.sectorEntityRepository.findOne({
        where: {
          name,
        },
      });
    } catch (e) {
      throw new WsException(e);
    }
  }
}
