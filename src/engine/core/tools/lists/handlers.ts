import { ListEditor, ColorListEditor } from "src/engine/core/interfaces/dtos/client-dtos/edit-list-dto";
import { Color } from "../../models/color/Color";
import { colorList } from "./color-list";




export const listEditorHandler = (item: ListEditor) => {
  if (item.listName === 'colors') {
    if (
      (<ColorListEditor<'add_new_color'>>item).operation === 'add_new_color'
    ) {
      const args = (<ColorListEditor<'add_new_color'>>item).arguments;
      const color = new Color(args.colorName, args.colorType);
      colorList.push(color);
    }
    if (
      (<ColorListEditor<'add_new_converter'>>item).operation ===
      'add_new_converter'
    ) {
      const args = (<ColorListEditor<'add_new_converter'>>item).arguments;
      const color = colorList.find(
        (c) => c.name.toUpperCase() === args.colorName.toUpperCase(),
      );
      color?.addConverter(
        args.converterName,
        args.typeConverter,
        args.transparency,
        args.converterGloss,
      );
    }
    if (
      (<ColorListEditor<'add_new_coler'>>item).operation === 'add_new_coler'
    ) {
      const args = (<ColorListEditor<'add_new_coler'>>item).arguments;
      const color = colorList.find(
        (c) => c.name.toUpperCase() === args.colorName.toUpperCase(),
      );
      color?.findConverter(args.converterName)?.addColer(args.name, args.value);
    }
  }
};
