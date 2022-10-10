import { MaterialType } from "src/core/types/model-types/material-type";

export class PanelUpdateInput {
  id: number;
  name?: string;
  type?: MaterialType;
}