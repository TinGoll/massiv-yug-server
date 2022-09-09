import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColerEntity } from '../../entities/coler.entity';
import { ConverterEntity } from '../../entities/converter.entity';
import { CreateColerInput } from '../../inputs/create-coler.input';
import { CreateConverterInput } from '../../inputs/create-converter.input';
import { UpdateColerInput } from '../../inputs/update-coler.input';


@Injectable()
export class ColerService {
  constructor(
    @InjectRepository(ColerEntity)
    private readonly colerRepository: Repository<ColerEntity>,
  ) {}

  async crateColer(createColorInput: CreateColerInput): Promise<ColerEntity> {
    return await this.colerRepository.save({ ...createColorInput });
  }

  async getOnColer(id: number): Promise<ColerEntity> {
    return await this.colerRepository.findOne({ where: { id } });
  }

  async getAllColer(): Promise<ColerEntity[]> {
    return await this.colerRepository.find();
  }

  async removeColer(id: number): Promise<number> {
    await this.colerRepository.delete({ id });
    return id;
  }

  async updateColer(updateColerInput: UpdateColerInput): Promise<ColerEntity> {
    await this.colerRepository.update(
      { id: updateColerInput.id },
      {
        ...updateColerInput,
      },
    );
    return this.getOnColer(updateColerInput.id);
  }

}
