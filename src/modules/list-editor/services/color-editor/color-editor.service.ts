import { ArgumentsHost, ExceptionFilter, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import {
  ColorConverterGloss,
  ColorType,
  ConverterTransparency,
  TypeColorConverter,
} from "src/engine/core/@types/color-types";
import {
  ListEditor,
  ColorListEditor,
} from "src/engine/core/interfaces/dtos/client-dtos/edit-list-dto";
import {
  ColorDto,
  ColorConverterDto,
  ColorColerDto,
} from "src/engine/core/interfaces/dtos/model-dtos/color-dto";
import {
  Color,
  ColorConverter,
  ColorColer,
} from "src/core/modeles/finishing/color/Color";

import { ColerService } from "src/modules/repository/finishing/services/coler/coler.service";
import { ColorService } from "src/modules/repository/finishing/services/color/color.service";
import { ConverterService } from "src/modules/repository/finishing/services/converter/converter.service";

@Injectable()
export class ColorEditorService {
  colorList: Color[] = [];

  constructor(
    private readonly colorServive: ColorService,
    private readonly converterService: ConverterService,
    private readonly colerService: ColerService
  ) {}

  async act(msg: ListEditor): Promise<void> {
    try {
      if (!msg.arguments) return;
      if (
        (<ColorListEditor<"add_new_color">>msg).operation === "add_new_color"
      ) {
        const args = (<ColorListEditor<"add_new_color">>msg).arguments;
        await this.addColor(args.colorName, args.colorType, args.dto);
      }

      if (
        (<ColorListEditor<"add_new_converter">>msg).operation ===
        "add_new_converter"
      ) {
        const args = (<ColorListEditor<"add_new_converter">>msg).arguments;

        if (!args) return;
        await this.addConverters(args);
      }

      if (
        (<ColorListEditor<"add_new_coler">>msg).operation === "add_new_coler"
      ) {
        const args = (<ColorListEditor<"add_new_coler">>msg).arguments;
        await this.addColer(args);
      }

      if ((<ColorListEditor<"update_color">>msg).operation === "update_color") {
        const args = (<ColorListEditor<"update_color">>msg).arguments;
        await this.updateColor(args.colorName, args.dto);
      }

      if (
        (<ColorListEditor<"update_converter">>msg).operation ===
        "update_converter"
      ) {
        const args = (<ColorListEditor<"update_converter">>msg).arguments;
        await this.updateConverter(
          args.colorName,
          args.converterName,
          args.dto
        );
      }
      if ((<ColorListEditor<"update_coler">>msg).operation === "update_coler") {
        const args = (<ColorListEditor<"update_coler">>msg).arguments;
        await this.updateColer(
          args.colorName,
          args.converterName,
          args.colerName,
          args.dto
        );
      }

      if (
        (<ColorListEditor<"remove_all_colors">>msg).operation ===
        "remove_all_colors"
      ) {
        await this.removeAllColors();
      }

      await this.load();
    } catch (e) {
      throw e;
    }
  }

  async load() {
    const colorEntitites = await this.colorServive.getAllColors();
    this.colorList = colorEntitites.map((entity) => Color.define(entity));
  }

  /** Добавить новый цвет */
  async addColor(
    colorName: string,
    colorType: ColorType,
    dto?: Partial<ColorDto>
  ): Promise<Color> {
    const candidate = await this.findColor(colorName);

    if (candidate)
      throw new WsException(
        "Цвет с таким названием не может быть создан, так как уже существует."
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
    const color = await this.findColor(args.colorName);
    const converter = color?.addConverter(
      args.converterName,
      args.typeConverter,
      args.transparency,
      args.converterGloss,
      args.value
    );

    const newConverter = await this.colorServive.addConverter(
      color.id,
      converter
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
    const color = await this.colorServive.getOneColorByName(args.colorName);
    if (!color) return;

    const converter = await this.converterService.getOneByName(
      args.converterName,
      color.id
    );
    if (!converter) return;
    const coler = await this.colorServive.addColer(converter.id, args);
  }

  async findColor(colorName: string): Promise<Color | null> {
    const color = await this.colorServive.getOneColorByName(colorName);
    return Color.define(color);
  }

  async getColors(): Promise<Color[]> {
    const entityColors = await this.colorServive.getAllColors();
    return entityColors.map((entity) => {
      const color = Color.define(entity);
      return color;
    });
  }

  async removeAllColors(): Promise<void> {
    await this.colorServive.removeAll();
  }

  removeColor(colorName: string): boolean {
    this.colorServive.removeColorByName(colorName);
    return true;
  }

  async removeConverter(
    colorName: string,
    converterName: string
  ): Promise<boolean> {
    const color = await this.findColor(colorName);
    if (!color) return false;
    const converterId = color.removeConverter(converterName);
    this.converterService.remove(converterId);
    return true;
  }

  async removeColer(
    colorName: string,
    converterName: string,
    colerName: string
  ): Promise<boolean> {
    const color = await this.findColor(colorName);
    if (!color) return false;
    return Boolean(color.findConverter(converterName)?.removeColer(colerName));
  }

  async updateColor(
    colorName: string,
    dto: Partial<ColorDto>
  ): Promise<Color | null> {
    const colorEntity = await this.colorServive.updateColorByName(
      colorName,
      dto
    );
    return Color.define(colorEntity);
  }

  async updateConverter(
    colorName: string,
    converterName: string,
    dto: Partial<ColorConverterDto>
  ): Promise<ColorConverter | null> {
    const color = await this.findColor(colorName);
    if (!color) return null;
    const converterEntity = await this.converterService.updateByName(
      color.id,
      converterName,
      dto
    );
    return ColorConverter.define(converterEntity);
  }

  async updateColer(
    colorName: string,
    converterName: string,
    colerName: string,
    dto: Partial<ColorColerDto>
  ): Promise<ColorColer | null> {
    return (
      (await this.findColor(colorName))
        ?.findConverter(converterName)
        ?.findColer(colerName)
        ?.update(dto) || null
    );
  }

  getList(): Color[] {
    return this.colorList;
  }
}
