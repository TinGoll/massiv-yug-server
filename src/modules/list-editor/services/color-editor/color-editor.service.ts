import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ColorConverterGloss, ColorType, ConverterTransparency, TypeColorConverter } from 'src/engine/core/@types/color-types';
import {
  ListEditor,
  ColorListEditor,
} from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import {
  ColorDto,
  ColorConverterDto,
  ColorColerDto,
} from 'src/engine/core/interfaces/dtos/model-dtos/color-dto';
import {
  Color,
  ColorConverter,
  ColorColer,
} from 'src/engine/core/models/color/Color';
import { ColorService } from 'src/modules/repository/finishing/services/color/color.service';

@Injectable()
export class ColorEditorService {
  colorList: Color[] = [];

  constructor(private readonly colorServive: ColorService) {}

  act(msg: ListEditor) {
    if (!msg.arguments) return;
    if ((<ColorListEditor<'add_new_color'>>msg).operation === 'add_new_color') {
      const args = (<ColorListEditor<'add_new_color'>>msg).arguments;
      this.addColor(args.colorName, args.colorType, args.dto);
    }

    if (
      (<ColorListEditor<'add_new_converter'>>msg).operation ===
      'add_new_converter'
    ) {
      const args = (<ColorListEditor<'add_new_converter'>>msg).arguments;

      if (!args) return;
      this.addConverters(args);
    }

    if ((<ColorListEditor<'add_new_coler'>>msg).operation === 'add_new_coler') {
      const args = (<ColorListEditor<'add_new_coler'>>msg).arguments;
      this.addColer(args)
    }

    if ((<ColorListEditor<'update_color'>>msg).operation === 'update_color') {
      const args = (<ColorListEditor<'update_color'>>msg).arguments;
      this.updateColor(args.colorName, args.dto);
    }

    if (
      (<ColorListEditor<'update_converter'>>msg).operation ===
      'update_converter'
    ) {
      const args = (<ColorListEditor<'update_converter'>>msg).arguments;
      this.updateConverter(args.colorName, args.converterName, args.dto);
    }
    if ((<ColorListEditor<'update_coler'>>msg).operation === 'update_coler') {
      const args = (<ColorListEditor<'update_coler'>>msg).arguments;
      this.updateColer(
        args.colorName,
        args.converterName,
        args.colerName,
        args.dto,
      );
    }

    if (
      (<ColorListEditor<'remove_all_colors'>>msg).operation ===
      'remove_all_colors'
    ) {
      this.removeAllColors();
    }
  }

  /** Добавить новый цвет */
  async addColor(
    colorName: string,
    colorType: ColorType,
    dto?: Partial<ColorDto>,
  ): Promise<Color> {
    const candidate = this.findColor(colorName);
    if (candidate)
      throw new WsException(
        'Цвет с таким названием не может быть создан, так как уже существует.',
      );
    const color = new Color(colorName, colorType);
    this.colorList.push(color);
    const saveDto = color.update(dto).getDto();
    const newColor = await this.colorServive.crateColor(saveDto);
    color.update(newColor);
    return color;
  }

  /** Добавить новый конвертер, в существующий цвет. */
  async addConverters(args: {
    colorName: string;
    converterName: string;
    typeConverter: TypeColorConverter;
    transparency: ConverterTransparency;
    converterGloss: ColorConverterGloss;
    value?: number;
  }): Promise<ColorConverter> {
    const color = this.findColor(args.colorName);
    const converter = color?.addConverter(
      args.converterName,
      args.typeConverter,
      args.transparency,
      args.converterGloss,
      args.value,
    );

    const newConverter = await this.colorServive.addConverter(
      color.id,
      converter,
    );
    converter.update(newConverter);
    return converter;
  }


  async addColer(args: {
    colorName: string;
    converterName: string;
    name: string;
    value: number;
  }): Promise<void> {

    const converter = this.findColor(args.colorName)
       ?.findConverter(args.converterName);
 
       console.log('**************');
       console.log('converter', converter);
    if (!converter) return;

    
    
    

    const coler = converter
      ?.addColer(args.name, args.value)
      .findColer(args.name);

    console.log('**************');
    console.log('coler', coler);
      
    const newColer = await this.colorServive.addColer(converter.id, coler);
    console.log('newColer', newColer);
    

    coler.update(newColer);
  }

  findColor(colorName: string): Color | null {
    const color = this.colorList.find(
      (c) => c.name.toUpperCase() === colorName.toUpperCase(),
    );

    if (!color) return null;
    return color;
  }

  getColors(): Color[] {
    return this.colorList;
  }

  async removeAllColors (): Promise<void> {
    await this.colorServive.removeAll()
  }

  removeColor(colorName: string): boolean {
    const indexColor = this.colorList.findIndex(
      (c) => c.name.toUpperCase() === colorName.toUpperCase(),
    );
    if (indexColor === -1) return false;
    this.colorList.splice(indexColor, 1);
    return true;
  }

  removeConverter(colorName: string, converterName: string): boolean {
    const color = this.findColor(colorName);
    if (!color) return false;
    return color.removeConverter(converterName);
  }

  removeColer(
    colorName: string,
    converterName: string,
    colerName: string,
  ): boolean {
    const color = this.findColor(colorName);
    if (!color) return false;
    return Boolean(color.findConverter(converterName)?.removeColer(colerName));
  }

  updateColor(colorName: string, dto: Partial<ColorDto>): Color | null {
    return this.findColor(colorName)?.update(dto) || null;
  }

  updateConverter(
    colorName: string,
    converterName: string,
    dto: Partial<ColorConverterDto>,
  ): ColorConverter | null {
    return (
      this.findColor(colorName)?.findConverter(converterName)?.update(dto) ||
      null
    );
  }

  updateColer(
    colorName: string,
    converterName: string,
    colerName: string,
    dto: Partial<ColorColerDto>,
  ): ColorColer | null {
    return (
      this.findColor(colorName)
        ?.findConverter(converterName)
        ?.findColer(colerName)
        ?.update(dto) || null
    );
  }

  getList(): Color[] {
    return this.colorList;
  }
}
