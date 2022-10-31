import { Unit } from "src/core/types/model-types/other-types";
import { CreateWorkInput } from "./create-work.input";

export interface UpdateWorkInput extends Partial<CreateWorkInput> {
  id: number;
}