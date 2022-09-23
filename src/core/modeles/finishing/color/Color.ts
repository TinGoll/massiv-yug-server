import { ColerEntity } from "src/modules/repository/finishing/entities/coler.entity";
import { ColorEntity } from "src/modules/repository/finishing/entities/color.entity";
import { ConverterEntity } from "src/modules/repository/finishing/entities/converter.entity";
import {
  ColorType,
  TypeColorConverter,
  ConverterTransparency,
  ColorConverterGloss,
} from "../../../types/model-types/color-types";
import { IDto } from "../../../types/interfaces/dto-interface";
import {
  ColorColerDto,
  ColorConverterDto,
  ColorDto,
} from "../../../types/dtos/finishing-dto/color-dto";

export class Color implements IDto<ColorDto> {
  id: number = 0;
  converters: ColorConverter[] = [];
  currentConverter: ColorConverter | null = null;
  name: string;
  colorType: ColorType;

  constructor(name: string, colorType: ColorType) {
    this.name = name;
    this.colorType = colorType;
  }

  getDto(): ColorDto {
    return {
      name: this.name,
      colorType: this.colorType,
      converters: this.converters,
      currentConverter: this.currentConverter,
    };
  }

  addConverter(
    name: string,
    typeConverter: TypeColorConverter,
    transparency: ConverterTransparency,
    converterGloss: ColorConverterGloss = "40%",
    value: number = 0
  ): ColorConverter {
    const converter = new ColorConverter(
      name,
      typeConverter,
      transparency,
      converterGloss,
      value
    );
    const index = this.converters.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase()
    );
    if (index !== -1) {
      this.converters[index] = converter;
    } else {
      this.converters.push(converter);
    }
    return converter;
  }

  removeConverter(name: string): number {
    const index = this.converters.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase()
    );
    if (index !== -1) {
      const converterId = this.converters[index].id;
      this.converters.splice(index, 1);
      return converterId;
    }
    return 0;
  }

  setCurrentConverter(index: number): this {
    try {
      this.currentConverter = this.converters[index] || null;
    } catch (e) {
      throw e;
    }
    return this;
  }

  getCurrentConverter(): ColorConverter | null {
    return this.currentConverter;
  }

  findConverter(name: string): ColorConverter | null {
    const index = this.converters.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase()
    );

    return this.converters[index] || null;
  }

  updateColor(colorDto: ColorDto): Color {
    return this;
  }
  updateConverter(
    converterName: string,
    dto: Partial<ColorConverterDto>
  ): ColorConverter | null {
    return this.findConverter(converterName)?.update(dto) || null;
  }
  updateColer(
    converterName: string,
    colerName: string,
    dto: ColorColerDto
  ): ColorColer | null {
    return (
      this.findConverter(converterName)?.findColer(colerName)?.update(dto) ||
      null
    );
  }

  update(dto: Partial<ColorDto>): this {
    if (!dto) return this;
    if (typeof dto.id !== "undefined") this.id = dto.id;
    if (typeof dto.name !== "undefined") this.name = dto.name;
    if (typeof dto.colorType !== "undefined") this.colorType = dto.colorType;
    if (typeof dto.currentConverter !== "undefined")
      this.currentConverter = dto.currentConverter;

    if (typeof dto.converters !== "undefined") {
      for (const converter of dto.converters) {
        const converterIndex = this.converters.findIndex(
          (c) => c.name.toUpperCase() === converter.name.toUpperCase()
        );
        if (converterIndex !== -1) {
          this.converters[converterIndex].update(converter);
        }
      }
    }
    return this;
  }

  public static define(colorEntity: ColorEntity): Color | null {
    if (!colorEntity) return null;
    const color = new Color(colorEntity.name, colorEntity.colorType);
    color.id = colorEntity.id;
    color.currentConverter = ColorConverter.define(
      colorEntity.currentConverter
    );
    color.converters = colorEntity.converters.map((converterDto) => {
      return ColorConverter.define(converterDto);
    });
    return color;
  }
}

export class ColorConverter implements IDto<ColorConverterDto> {
  id: number = 0;
  public typeConverter: TypeColorConverter;
  public converterGloss: ColorConverterGloss;
  public name: string;
  public value: number = 0;
  public colers: Array<ColorColer> = new Array<ColorColer>();
  public transparency: ConverterTransparency;
  constructor(
    name: string,
    typeConverter: TypeColorConverter,
    transparency: ConverterTransparency,
    converterGloss: ColorConverterGloss = "40%",
    value: number = 0
  ) {
    this.name = name;
    this.typeConverter = typeConverter;
    this.converterGloss = converterGloss;
    this.transparency = transparency;
    this.value = value;
  }
  getDto(): ColorConverterDto {
    return {
      id: this.id,
      typeConverter: this.typeConverter,
      converterGloss: this.converterGloss,
      name: this.name,
      value: this.value,
      colers: this.colers,
      transparency: this.transparency,
    };
  }
  addColer(name: string, value: number = 0): this {
    const index = this.colers.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase()
    );
    if (index !== -1) {
      this.colers[index].value = value;
    } else {
      this.colers.push(new ColorColer(name, value));
    }
    return this;
  }

  findColer(colerName: string): ColorColer | null {
    const colerIndex = this.colers.findIndex(
      (c) => c.name.toUpperCase() === colerName.toUpperCase()
    );
    if (colerIndex === -1) return null;
    return this.colers[colerIndex] || null;
  }
  removeColer(name: string): boolean {
    const index = this.colers.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase()
    );
    if (index !== -1) {
      this.colers.splice(index, 1);
      return true;
    }
    return false;
  }

  setValue(value: number): this {
    this.value = value;
    return this;
  }

  update(dto: Partial<ColorConverterDto>): this {
    if (!dto) return this;
    if (typeof dto.id !== "undefined") this.id = dto.id;
    if (typeof dto.name !== "undefined") this.name = dto.name;
    if (typeof dto.converterGloss !== "undefined")
      this.converterGloss = dto.converterGloss;
    if (typeof dto.transparency !== "undefined")
      this.transparency = dto.transparency;
    if (typeof dto.typeConverter !== "undefined")
      this.typeConverter = dto.typeConverter;
    if (typeof dto.value !== "undefined") this.value = dto.value;
    if (typeof dto.colers !== "undefined") {
      for (const colerDto of dto.colers) {
        const coler = this.findColer(colerDto.name);
        if (coler) coler.update(colerDto);
      }
    }
    return this;
  }

  public static define(converterEntity: ConverterEntity | null) {
    if (!converterEntity) return null;
    const {
      name,
      converterGloss,
      transparency,
      typeConverter,
      value,
      id,
    } = converterEntity;
    const converter = new ColorConverter(
      name,
      typeConverter,
      transparency,
      converterGloss,
      value
    );
    converter.id = id;
    converter.colers = converterEntity.colers.map((colerDto) =>
      ColorColer.define(colerDto)
    );
    return converter;
  }
}

export class ColorColer {
  id: number = 0;
  name: string;
  value: number;
  constructor(name: string, value: number = 0) {
    this.name = name;
    this.value = value;
  }

  setValue(value: number) {
    this.value = value;
  }
  update(dto: Partial<ColorColerDto>): this {
    if (typeof dto.id !== "undefined") this.id = dto.id;
    if (typeof dto.name !== "undefined") this.name = dto.name;
    if (typeof dto.value !== "undefined") this.value = dto.value;
    return this;
  }

  public static define(colerEntity: ColerEntity | null): ColorColer | null {
    if (!colerEntity) return null;
    const { name, value, id } = colerEntity;
    const coler = new ColorColer(name, value);
    coler.id = id;
    return coler;
  }
}
