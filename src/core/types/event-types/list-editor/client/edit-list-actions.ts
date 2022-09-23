
import {
  ColorType,
  TypeColorConverter,
  ConverterTransparency,
  ColorConverterGloss,
} from 'src/core/types/model-types/color-types';
import {
  ColorColerDto,
  ColorConverterDto,
  ColorDto,
} from '../../../dtos/finishing-dto/color-dto';
import { ProfileDto } from '../../../dtos/profile-dto/profile-dto';
import { WorkDto } from '../../../dtos/work-dto/work-dto';

/********************************************************************************** */
/***************************** Технические типы *********************************** */
/********************************************************************************** */



type listName = typeof listNames[number];
const listNames = ['colors', 'patinas', 'works', 'profiles'] as const;

export interface ListEditor {
  listName: listName;
  operation: string;
  arguments: any;
}

/*******************  Аргументы операции по цвету   ******************* */
interface ListColorArguments {
  add_new_color: {
    colorName: string;
    colorType: ColorType;
    dto?: Partial<ColorDto>;
  };
  add_new_converter: {
    colorName: string;
    converterName: string;
    typeConverter: TypeColorConverter;
    transparency: ConverterTransparency;
    converterGloss: ColorConverterGloss;
    value?: number;
  };
  add_new_coler: {
    colorName: string;
    converterName: string;
    name: string;
    value: number;
  };
  remove_all_colors: {
  };
  remove_color: {
    colorName: string;
  };
  remove_converter: {
    colorName: string;
    converterName: string;
  };

  remove_coler: {
    colorName: string;
    converterName: string;
    colerName: string;
  };

  update_color: {
    colorName: string;
    dto: Partial<ColorDto>;
  };
  update_converter: {
    colorName: string;
    converterName: string;
    dto: Partial<ColorConverterDto>;
  };

  update_coler: {
    colorName: string;
    converterName: string;
    colerName: string;
    dto: Partial<ColorColerDto>;
  };
}
type ListColorOperation = keyof ListColorArguments;

/*****************  Аргументы операции по патине   ******************* */


interface ListPatinaArguments {
  add_new_patina: {
    patinaName: string;
    patinaType: ColorType;
  };

  add_new_rastvoritel: {
    name: string;
    value: number;
  };
}
type ListPatinaOperation = keyof ListPatinaArguments;

/*****************  Аргументы операции по работам   ***************** */

interface ListWorkArguments {
  add_new_work: {
    workName: string;
    dto?: Partial<WorkDto>;
  };

  remove_work: {
    workName: string;
  };

  update_work: {
    workName: string;
    dto: Partial<WorkDto>;
  };
}

type ListWorkOperation = keyof ListWorkArguments;


/*****************  Аргументы операции по профилю   ***************** */

interface ListProfileArguments {
  add_new_profile: {
    profileName: string;
    dto?: Partial<ProfileDto>;
  };

  remove_profile: {
    profileName: string;
  };

  update_profile: {
    profileName: string;
    dto: Partial<ProfileDto>;
  };
}

type ListProfileOperation = keyof ListProfileArguments;


/********************************************************************************** */
/*************************** Пользовательские типы ******************************** */
/********************************************************************************** */

export interface ColorListEditor<O extends ListColorOperation> extends ListEditor {
  listName: "colors";
  operation: O;
  arguments: ListColorArguments[O];
}

export interface WorkListEditor<O extends ListWorkOperation>
  extends ListEditor {
  listName: 'works';
  operation: O;
  arguments: ListWorkArguments[O];
}

export interface ProfileListEditor<O extends ListProfileOperation> extends ListEditor {
  listName: 'profiles';
  operation: O;
  arguments: ListProfileArguments[O];
}


export interface PatinaListEditor<O extends ListPatinaOperation> extends ListEditor {
  listName: "patinas";
  operation: O;
  arguments: ListPatinaArguments[O];
}
