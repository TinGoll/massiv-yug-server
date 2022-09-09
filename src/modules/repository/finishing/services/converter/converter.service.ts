import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterEntity } from '../../entities/converter.entity';
import { CreateConverterInput } from '../../inputs/create-converter.input';
import { UpdateConverterInput } from '../../inputs/update-converter.input';

@Injectable()
export class ConverterService {
  constructor(
    @InjectRepository(ConverterEntity)
    private readonly converterRepository: Repository<ConverterEntity>,
  ) {}

  async crate(
   createConverterInput: CreateConverterInput,
  ): Promise<ConverterEntity> {
    return await this.converterRepository.save({ ...createConverterInput });
  }

  async getOne(id: number): Promise<ConverterEntity> {
    return await this.converterRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<ConverterEntity[]> {
    return await this.converterRepository.find();
  }

  async remove(id: number): Promise<number> {
    await this.converterRepository.delete({ id });
    return id;
  }

  async update(
    updateConverterInput: UpdateConverterInput,
  ): Promise<ConverterEntity> {
    await this.converterRepository.update(
      { id: updateConverterInput.id },
      {
        ...updateConverterInput,
      },
    );
    return this.getOne(updateConverterInput.id);
  }
}
