import { Person } from '../../person/person';
import { BookDocument } from '../document/document';

type BookResults = {
  finishingSquare: number;
  facadeSquare: number;
  plateSquare: number;
  profileLinearMeters: number;
  chmzLinearMeters: number;
};

interface BookState {

}

export class Book {
  id: number | null = null;
  client: Person | null = null;
  author: Person | null = null;
  dateCreation: Date | null = null;
  dateUpdate: Date | null = null;
  barcode: string | null = null;
  status: string | null = null;
  nameFromClient: string | null = null;
  note: string | null = null;
  type: string | null = null;

  documents: BookDocument[] = [];

  private _not_save_database: boolean = false;

  results: BookResults = {
    finishingSquare: 0,
    facadeSquare: 0,
    plateSquare: 0,
    profileLinearMeters: 0,
    chmzLinearMeters: 0,
  };

  constructor() {}

  isNotSavedToDb(): boolean {
    return this._not_save_database;
  }

  getState(): BookState {
    return {
      ...this,
      documents: this.documents.map(d => d.getState())
    }
  }

  public static load() {
    // Реализовать загрузку из базы данных, путем приема в качестве аргумента сущности книги.
    return new Book();
  }

  public static new(): Book {
    const book = new Book();
    book._not_save_database = true;
    return book;
  }


}
