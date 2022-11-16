import { BookResultData } from 'src/core/@types/app.types';

export class BookCreateInput {
  /** Номер / название клиента */
  nameFromClient?: string;
  /** Комментарий / примечание */
  note?: string;
  /** Штрих код */
  barcode?: string;
  /** Результативные данные */
  resultData?: BookResultData;
}
export class BookUpdateInput {
  id: number;
  /** Номер / название клиента */
  nameFromClient?: string;
  /** Комментарий / примечание */
  note?: string;
  /** Штрих код */
  barcode?: string;
  /** Результативные данные */
  resultData?: BookResultData;
}
