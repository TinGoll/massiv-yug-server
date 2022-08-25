import { Color } from 'src/engine/core/models/color/Color';
import { ColorDto } from '../model-dtos/color-dto';
import { ProfileDto } from '../model-dtos/profile-dto';
import { WorkDto } from '../model-dtos/work-dto';

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
