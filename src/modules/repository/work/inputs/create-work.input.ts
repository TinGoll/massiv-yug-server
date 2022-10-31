import { Unit } from "src/core/types/model-types/other-types";

export interface CreateWorkInput {
  name: string;
  price?: number;
  norm?: number;
  unit?: Unit;
  data?: object;
}