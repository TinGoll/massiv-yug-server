import { Unit } from "src/engine/core/@types/other-types";

export interface WorkDto {
  name: string;
  unit: Unit;
  price: number;
  cost: number;
  norm: number;
  dateBeginning: Date;
  dateEnd: Date;
}
