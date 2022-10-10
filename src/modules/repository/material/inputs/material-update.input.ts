import { MaterialType } from "src/core/types/model-types/material-type";

export class MaterialUpdateInput {
  id: number;
  name?: string;
  type?: MaterialType;
}