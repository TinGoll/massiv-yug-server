import { Color } from "../../../../core/modeles/finishing/color/Color";

const colorList: Color[] = [];

const colorRal9010 = new Color("Ral9010", "Эмаль");

let converter = colorRal9010.addConverter("5333", "Акрил", "Белый", "40%");

converter
  .addColer("0952", 0.372)
  .addColer("0909", 1.11)
  .addColer("0917", 2.623)
  .addColer("0920", 0.282)
  .addColer("0925", 0.038);

colorList.push(colorRal9010);

export { colorList };
