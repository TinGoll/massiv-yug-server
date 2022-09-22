import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorColer } from "src/core/modeles/finishing/color/Color";
import { Repository } from "typeorm";
import { ColorEntity } from "../../entities/color.entity";
import { CreateColerInput } from "../../inputs/create-coler.input";
import { CreateColorInput } from "../../inputs/create-color.input";
import { CreateConverterInput } from "../../inputs/create-converter.input";
import { UpdateColorInput } from "../../inputs/update-color.input";
import { ColerService } from "../coler/coler.service";
import { ConverterService } from "../converter/converter.service";

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    private readonly converterService: ConverterService,
    private readonly colerServive: ColerService
  ) {}

  async crateColor(createColorInput: CreateColorInput): Promise<ColorEntity> {
    return await this.colorRepository.save({ ...createColorInput });
  }

  async getOneColor(id: number): Promise<ColorEntity> {
    return await this.colorRepository.findOne({ where: { id } });
  }

  async getOneColorByName(name: string): Promise<ColorEntity | null> {
    return await this.colorRepository.findOne({
      where: {
        name,
      },
    });
  }

  async getAllColors(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async removeColor(id: number): Promise<number> {
    await this.colorRepository.delete({ id });
    return id;
  }

  async removeColorByName(name: string): Promise<void> {
    await this.colorRepository.delete({ name });
  }

  async removeAll(): Promise<void> {
    const colors = await this.getAllColors();
    for (const color of colors) {
      await this.colorRepository.delete({ id: color.id });
    }
  }

  async updateColorByName(
    name: string,
    updateColorInput: Partial<UpdateColorInput>
  ): Promise<ColorEntity | null> {
    await this.colorRepository.update(
      {
        name,
      },
      { ...updateColorInput }
    );
    return await this.getOneColorByName(name);
  }

  async updateColor(updateColorInput: UpdateColorInput): Promise<ColorEntity> {
    await this.colorRepository.update(
      { id: updateColorInput.id },
      {
        ...updateColorInput,
      }
    );
    return this.getOneColor(updateColorInput.id);
  }

  /**
   * Создание конвертера в уже созданом цвете.
   * @param id идентификатор цвета
   * @param converterInputs inputs конвертеров, через запятую.
   * @returns измененный цвет.
   */
  async addConverter(
    id: number,
    ...converterInputs: CreateConverterInput[]
  ): Promise<ColorEntity> {
    const color = await this.getOneColor(id);
    if (!color) return null;
    const converters = await Promise.all(
      converterInputs.map(async (input) => {
        const converter = await this.converterService.crate(input);
        return converter;
      })
    );

    color.converters.push(...converters);
    await this.colorRepository.save(color);

    return await this.getOneColor(id);
  }

  async addColer(
    converterId: number,
    ...colerInputs: CreateColerInput[]
  ): Promise<ColorColer | null> {
    const converter = await this.converterService.getOne(converterId);
    if (!converter) return null;

    const colers = await Promise.all(
      colerInputs.map(async (input) => {
        return await this.colerServive.crateColer(input);
      })
    );
    converter.colers = colers;
    this.converterService.save(converter);
  }
}
