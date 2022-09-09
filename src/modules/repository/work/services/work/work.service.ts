import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkEntity } from '../../entities/work.entity';
import { CreateWorkInput } from '../../inputs/create-work.input';
import { UpdateWorkInput } from '../../inputs/update-work.input';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkEntity)
    private readonly workRepository: Repository<WorkEntity>,
  ) {}

  async crate(createWorkInput: CreateWorkInput): Promise<WorkEntity> {
    return await this.workRepository.save({ ...createWorkInput });
  }

  async getOne(id: number): Promise<WorkEntity> {
    return await this.workRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<WorkEntity[]> {
    return await this.workRepository.find();
  }

  async remove(id: number): Promise<number> {
    await this.workRepository.delete({ id });
    return id;
  }

  async update(updateWorkInput: UpdateWorkInput): Promise<WorkEntity> {
    await this.workRepository.update(
      { id: updateWorkInput.id },
      {
        ...updateWorkInput,
      },
    );
    return this.getOne(updateWorkInput.id);
  }
}
