import {
  ColorType,
  TypeColorConverter,
  ConverterTransparency,
  ColorConverterGloss,
} from '../../@types/color-types';
import {
  ColorColerDto,
  ColorConverterDto,
  ColorDto,
} from '../../interfaces/dtos/model-dtos/color-dto';

export class Color {
  converters: ColorConverter[] = [];
  currentConverter: ColorConverter | null = null;
  name: string;
  colorType: string;

  constructor(name: string, colorType: ColorType) {
    this.name = name;
    this.colorType = colorType;
  }

  addConverter(
    name: string,
    typeConverter: TypeColorConverter,
    transparency: ConverterTransparency,
    converterGloss: ColorConverterGloss = '40%',
  ): ColorConverter {
    const converter = new ColorConverter(
      name,
      typeConverter,
      transparency,
      converterGloss,
    );
    const index = this.converters.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase(),
    );
    if (index !== -1) {
      this.converters[index] = converter;
    } else {
      this.converters.push(converter);
    }
    return converter;
  }

  removeConverter(name: string): boolean {
    const index = this.converters.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase(),
    );
    if (index !== -1) {
      this.converters.splice(index, 1);
      return true;
    }
    return false;
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
      (c) => c.name.toUpperCase() === name.toUpperCase(),
    );
    return this.converters[index] || null;
  }

  updateColor(colorDto: ColorDto): Color {
    return this;
  }
  updateConverter(
    converterName: string,
    dto: Partial<ColorConverterDto>,
  ): ColorConverter | null {
    return this.findConverter(converterName)?.update(dto) || null;
  }
  updateColer(
    converterName: string,
    colerName: string,
    dto: ColorColerDto,
  ): ColorColer | null {
    return (
      this.findConverter(converterName)?.findColer(colerName)?.update(dto) ||
      null
    );
  }

  update(dto: Partial<ColorDto>): this {
    if (!dto) return this;
    if (typeof dto.name !== 'undefined') this.name = dto.name;
    if (typeof dto.colorType !== 'undefined') this.colorType = dto.colorType;
    if (typeof dto.currentConverter !== 'undefined')
      this.currentConverter = dto.currentConverter;

    if (typeof dto.converters !== 'undefined') {
      for (const converter of dto.converters) {
        const converterIndex = this.converters.findIndex(
          (c) => c.name.toUpperCase() === converter.name.toUpperCase(),
        );
        if (converterIndex !== -1) {
          this.converters[converterIndex].update(converter);
        }
      }
    }
    return this;
  }
}



export class ColorConverter {
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
    converterGloss: ColorConverterGloss = '40%',
  ) {
    this.name = name;
    this.typeConverter = typeConverter;
    this.converterGloss = converterGloss;
    this.transparency = transparency;
  }
  addColer(name: string, value: number = 0): this {
    const index = this.colers.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase(),
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
      (c) => c.name.toUpperCase() === colerName.toUpperCase(),
    );
    if (colerIndex === -1) return null;
    return this.colers[colerIndex] || null;
  }
  removeColer(name: string): boolean {
    const index = this.colers.findIndex(
      (c) => c.name.toUpperCase() === name.toUpperCase(),
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
    if (typeof dto.name !== 'undefined') this.name = dto.name;
    if (typeof dto.converterGloss !== 'undefined')
      this.converterGloss = dto.converterGloss;
    if (typeof dto.transparency !== 'undefined')
      this.transparency = dto.transparency;
    if (typeof dto.typeConverter !== 'undefined')
      this.typeConverter = dto.typeConverter;
    if (typeof dto.value !== 'undefined') this.value = dto.value;
    if (typeof dto.colers !== 'undefined') {
      for (const colerDto of dto.colers) {
        const coler = this.findColer(colerDto.name);
        if (coler) coler.update(colerDto);
      }
    }
    return this;
  }
}

export class ColorColer {
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
    if (typeof dto.name !== 'undefined') this.name = dto.name;
    if (typeof dto.value !== 'undefined') this.value = dto.value;
    return this;
  }
}
