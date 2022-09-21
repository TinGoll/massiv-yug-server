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

  async getOneByName(
    name: string,
    colorId: number,
  ): Promise<ConverterEntity | null> {
    return await this.converterRepository.findOne({
      where: {
        colorId,
        name,
      },
    });
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

  async updateByName(
    colorId: number,
    name: string,
    updateConverterInput: Partial<UpdateConverterInput>,
  ): Promise<ConverterEntity> {
    await this.converterRepository.update(
      {
        colorId,
        name,
      },
      { ...updateConverterInput },
    );
    return await this.getOneByName(name, colorId);
  }

  async save(converter: ConverterEntity): Promise<ConverterEntity> {
    await this.converterRepository.save(converter);
    return await this.getOne(converter.id);
  }
}
