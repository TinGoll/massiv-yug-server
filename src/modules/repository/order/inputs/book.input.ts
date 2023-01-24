import { BookDocumentType, BookResultData } from 'src/core/@types/app.types';

export class BookCreateInput {
  documentType?: BookDocumentType; //Даник решил добавить тип еще и в книгу.
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
  documentType?: BookDocumentType; //Даник решил добавить тип еще и в книгу.
  /** Номер / название клиента */
  nameFromClient?: string;
  /** Комментарий / примечание */
  note?: string;
  /** Штрих код */
  barcode?: string;
  /** Результативные данные */
  resultData?: BookResultData;
}
