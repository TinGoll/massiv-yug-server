import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { WorkSampleEntity } from '../../entities/work-sample.emtity';
import { CreateWorkInput } from '../../inputs/create-work.input';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkSampleEntity)
    private readonly workEntityRepository: Repository<WorkSampleEntity>,
  ) {}

  create(input: CreateWorkInput): WorkSampleEntity {
    try {
      const entity = this.workEntityRepository.create({ ...input });
      return entity;
    } catch (e) {
      throw new WsException(e);
    }
  }

  async save(entity: WorkSampleEntity): Promise<WorkSampleEntity> {
    try {
      return await this.workEntityRepository.save(entity);
    } catch (e) {
      throw new WsException(e);
    }
  }
}
