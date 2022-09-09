import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from '../../entities/color.entity';
import { ConverterEntity } from '../../entities/converter.entity';
import { CreateColorInput } from '../../inputs/create-color.input';
import { CreateConverterInput } from '../../inputs/create-converter.input';
import { UpdateColorInput } from '../../inputs/update-color.input';
import { ConverterService } from '../converter/converter.service';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    private readonly converterService: ConverterService
  ) {}

  async crateColor(createColorInput: CreateColorInput): Promise<ColorEntity> {
    return await this.colorRepository.save({ ...createColorInput });
  }

  async getOneColor(id: number): Promise<ColorEntity> {
    return await this.colorRepository.findOne({ where: { id } });
  }

  async getAllColors(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async removeColor(id: number): Promise<number> {
    await this.colorRepository.delete({ id });
    return id;
  }

  async updateColor(updateColorInput: UpdateColorInput): Promise<ColorEntity> {
    await this.colorRepository.update(
      { id: updateColorInput.id },
      {
        ...updateColorInput,
      },
    );
    return this.getOneColor(updateColorInput.id);
  }

  /**
   * Создание конвертера в уже созданом цвете.
   * @param id идентификатор цвета
   * @param converterInputs inputs конвертеров, через запятую.
   * @returns измененный цвет.
   */
  async addConverter(id: number,  ...converterInputs: CreateConverterInput[]): Promise<ColorEntity> {
    const color = await this.getOneColor(id);

    const converters = await Promise.all(converterInputs.map(input => {
      const converter = this.converterService.crate(input);
      return converter;
    }))
    color.converters.push(...converters);
    await this.colorRepository.save(color);

    return await this.getOneColor(id);
  }
}
