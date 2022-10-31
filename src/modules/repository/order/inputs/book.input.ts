import { PersonEntity } from "../../person/entities/person.entity";
import { BookStatusEntity } from "../entities/book-statuses.entity";

export class BookCreateInput {
  nameFromClient?: string;
  note?: string;
}

export class BookUpdateInput {
  id: number;
  nameFromClient?: string;
  note?: string;
  barcode?: string;
  resultData?: object;
  clientId: number;
  authorId: number;
  statusId: number;
}

