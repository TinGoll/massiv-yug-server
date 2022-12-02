/******************************************************* */
// Цвет.

import { type } from 'os';
import { ComponentData } from 'src/modules/repository/order/entities/document.element.entity';
import { Geometry } from '../common/models/geometry';

/** Тип цвета */
export type ColorType = 'Эмаль' | 'Морилка';
/** Тип конвентера */
export type TypeColorConverter = 'Акрил' | 'Полиуретан';
/** Глянцевость конвентера */
export type ColorConverterGloss = '20%' | '40%' | '70%';
/** Прозрачность конвернета */
export type ConverterTransparency = 'Прозрачный' | 'Белый';

//Патина
/** Тип патины */
export type PatinaType = 'Однокомпонентная' | 'Многокомпонентная';

// Лак
/** Тип лака */
export type VarnishType = 'Акриловый' | 'Полиуретановый';
/** Глянцевость */
export type VarnishGlossiness = '10%' | '20%' | '40%' | '70%' | '90%';

// Материал
/** Тип материала */
export type MaterialType =
  | 'Массив твердый'
  | 'Массив мягкий'
  | 'МДФ'
  | 'Полиуретан'
  | 'ЛДСП'
  | 'ДСП';

//Профиль
/** Угол сращивания */
export type SplicingAngle = '90°' | '45°';

/** Еденица измерения */
export type Unit = 'м²' | 'м.п' | 'шт.' | 'м. куб.' | 'п.м.п';

export type UserStatus = 'fired' | 'active';

export type BookDocumentType = 'Фасады' | 'Лестницы';

export type PanelType = 'Филёнка' | 'Решётка' | 'Витрина';

export interface WorkData {
  workId: number;
  name: string;
  price: number;
  norm: number;
  unit: Unit;
  salaryUnit: Unit;
  data?: any;
}

export interface WorkComponentData {
  workId: number;
  data?: WorkData;
}

/** Данные компонента филёнка */
export interface PanelData {
  panels: Array<Panel>;
}

/** Поле филенка, компонента филёнка */
export interface Panel {
  index: number;
  type: PanelType;
  shirt: Shirt | null;
  geometry: Geometry;
  workData: WorkData[];
}

/** Поле рубашка, поля филёнка, в компоненте филёнка. */
export interface Shirt {
  geometry: Geometry;
  workData: WorkData[];
}
/** Данные компонента профиль */
export interface ProfileData {
  profiles: Array<Profile>;
  workData: WorkData[];
}
/** Профиль */
export interface Profile {
  name: 'Левый' | 'Верхний' | 'Правый' | 'Нижний';
  geometry: Geometry;
}

export type DocumentGlossiness =
  | 'Глубоко матовый (10%)'
  | 'Матовый (20%)'
  | 'Лёгкий глянец (40%)'
  | 'Глянец (70%)'
  | 'Сильный глянец (90%)';

export interface BookResultData {}
export interface DocumentResultData {}

export interface BookOptions {
  bookId?: number;
  clientId?: number;
  nameFromClient?: string;
  note?: string;
}
export interface DocumentOptions {
  documentType?: BookDocumentType;
  glossiness?: DocumentGlossiness;
  note?: string;
}
export interface ElementOptions {
  name?: string;
  components?: ComponentData[]
}

export interface AssignColorOptions {
  value?: number;
  note?: string;
  data?: object;
  previousName?: string;
  converterId?: number;
}
export interface AssignPatinaOptions {
  value?: number;
  previousName?: string;
  note?: string;
  converterId?: number;
}
export interface AssignVarnishOptions {
  note?: string;
  previousName?: string;
  value?: number;
}
export interface AssignPanelOptions {
  note?: string;
  workData?: WorkComponentData[];
  shirtWorkData?: WorkComponentData[];
  colorId?: number;
  materialId?: number;
}
export interface AssignProfileOptions {
  workData?: WorkComponentData[];
  widths?: number[];
  angle?: SplicingAngle;
  note?: string;
}
