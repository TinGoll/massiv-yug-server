import { Unit } from "src/engine/core/@types/other-types";

export interface WorkDto {
  id?: number;
  name: string;
  unit: Unit;
  price: number;
  cost: number;
  norm: number;
  dateBeginning: Date;
  dateEnd: Date;
}
