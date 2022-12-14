import { MaterialType } from "src/core/@types/app.types";




export const migrateMaterials: Array<{
  original: string;
  materialName: typeof NameMaterial[number] | null;
}> = [
  { original: 'см примечание', materialName: null },
  { original: '- см. примечание -', materialName: null },
  { original: '50/50', materialName: null },
  { original: '…', materialName: null },
  { original: '….', materialName: null },
  { original: 'Бук', materialName: 'Бук' },
  { original: 'ДСП', materialName: 'ДСП' },
  { original: 'ДУБ-ЯСЕНЬ', materialName: 'Дуб' },
  { original: 'Дуб', materialName: 'Дуб' },
  { original: 'Дуб+ясень', materialName: 'Дуб' },
  { original: 'Дуб, Ольха', materialName: 'Дуб' },
  { original: 'Дуб, Ольха см.примечание', materialName: 'Дуб' },
  { original: 'Дуб, Ясень', materialName: 'Дуб' },
  { original: 'Дуб, ольха', materialName: 'Дуб' },
  { original: 'Дуб/Ольха', materialName: 'Дуб' },
  { original: 'Железо', materialName: null },
  { original: 'ЛДСП', materialName: 'ЛДСП' },
  { original: 'МДФ', materialName: 'МДФ' },
  { original: 'МДФ + шпон ясеня', materialName: 'МДФ' },
  { original: 'МДФ шпон', materialName: 'МДФ' },
  { original: 'МДФ+шпон', materialName: 'МДФ' },
  { original: 'Мдф', materialName: 'МДФ' },
  { original: 'ОРЕХ', materialName: 'Орех' },
  { original: 'Ольха', materialName: 'Ольха' },
  { original: 'Ольха+МДФ', materialName: 'Ольха' },
  { original: 'Орех', materialName: 'Орех' },
  { original: 'СМ. ПРИМЕЧАНИЕ', materialName: null },
  { original: 'СМ.ПРИМЕЧАНИЕ', materialName: null },
  { original: 'См. прим. к позициям', materialName: null },
  { original: 'Сосна', materialName: 'Сосна' },
  { original: 'Фанера', materialName: null },
  { original: 'Ясень', materialName: 'Ясень' },
  { original: 'Ясень не менее 5мм', materialName: 'Ясень' },
  { original: 'Ясень, МДФ', materialName: 'Ясень' },
  { original: 'дуб', materialName: 'Дуб' },
  { original: 'короба на фасады', materialName: null },
  { original: 'мдф', materialName: 'МДФ' },
  { original: 'не важно', materialName: null },
  { original: 'нет', materialName: null },
  { original: 'ольха', materialName: 'Ольха' },
  { original: 'полиуретан', materialName: 'Полиуретан' },
  { original: 'см пимечание', materialName:  null},
  { original: 'см примечание', materialName:  null},
  { original: 'см. примечание', materialName:  null},
  { original: 'см. примечание к позициям', materialName: null },
  { original: 'см. примечания', materialName: null },
  { original: 'см.примечание', materialName: null },
  { original: 'см.примечания', materialName: null },
  { original: 'ссм примечание', materialName: null },
  { original: 'ясень', materialName: 'Ясень' },
];

export const createdMigrateMaterial: Array<{ name: string; type: MaterialType }> = [
  { name: 'Дуб', type: 'Массив твердый' },
  { name: 'Ясень', type: 'Массив твердый' },
  { name: 'Бук', type: 'Массив твердый' },
  { name: 'Ольха', type: 'Массив мягкий' },
  { name: 'Сосна', type: 'Массив мягкий' },
  { name: 'Орех', type: 'Массив мягкий' },
  { name: 'Полиуретан', type: 'Полиуретан' },
  { name: 'МДФ', type: 'МДФ' },
  { name: 'ЛДСП', type: 'ЛДСП' },
  { name: 'ДСП', type: 'ДСП' },
];

const NameMaterial = [
  'Дуб',
  'Ясень',
  'Бук',
  'Ольха',
  'Сосна',
  'Орех',
  'Полиуретан',
  'МДФ',
  'ЛДСП',
  'ДСП',
] as const;

