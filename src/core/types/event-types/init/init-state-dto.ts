import { Color } from "src/core/modeles/finishing/color/Color";
import { ColorDto } from "../../dtos/finishing-dto/color-dto";
import { ProfileDto } from "../../dtos/profile-dto/profile-dto";
import { WorkDto } from "../../dtos/work-dto/work-dto";

export interface InitializingClientState {
  tools: InitializingClientTools;
}

export interface InitializingClientTools {
  lists: InitializingClientLists;
}

export interface InitializingClientLists {
  // Все списки, необходимые для программы.
  colors: ColorDto[];
  profiles: ProfileDto[];
  works: WorkDto[];
  lists: Array<{
    label: string;
    value: keyof InitializingClientLists;
  }>;
}

export interface ClientLog {
  ts: number;
  msg: string;
}
