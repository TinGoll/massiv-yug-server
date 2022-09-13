import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ColorType } from 'src/engine/core/@types/color-types';
import { ListEditor, ColorListEditor } from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import { ColorDto, ColorConverterDto, ColorColerDto } from 'src/engine/core/interfaces/dtos/model-dtos/color-dto';
import { Color, ColorConverter, ColorColer } from 'src/engine/core/models/color/Color';

@Injectable()
export class ColorEditorService {
  colorList: Color[] = [];

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
      this.findColor(args.colorName)
        ?.addConverter(
          args.converterName,
          args.typeConverter,
          args.transparency,
          args.converterGloss,
        )
        .setValue(args.value || 0);
    }
    if ((<ColorListEditor<'add_new_coler'>>msg).operation === 'add_new_coler') {
      const args = (<ColorListEditor<'add_new_coler'>>msg).arguments;
      this.findColor(args.colorName)
        ?.findConverter(args.converterName)
        ?.addColer(args.name, args.value);
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
  }

  addColor(
    colorName: string,
    colorType: ColorType,
    dto?: Partial<ColorDto>,
  ): Color {
    const candidate = this.findColor(colorName);
    if (candidate)
      throw new WsException(
        'Цвет с таким названием не может быть создан, так как уже существует.',
      );
    const color = new Color(colorName, colorType);
    this.colorList.push(color);
    return color.update(dto);
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
