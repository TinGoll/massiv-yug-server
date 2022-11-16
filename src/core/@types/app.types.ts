/******************************************************* */
// Цвет.

import { type } from 'os';

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
export type Unit = 'м²' | 'м.п' | 'шт.' | 'м. куб.';

export type UserStatus = 'fired' | 'active';

export type BookDocumentType = 'Фасады' | 'Лестницы';

export type DocumentGlossiness =
  | 'Глубоко матовый (10%)'
  | 'Матовый (20%)'
  | 'Лёгкий глянец (40%)'
  | 'Глянец (70%)'
  | 'Сильный глянец (90%)';

export interface BookResultData {}
export interface DocumentResultData {}
