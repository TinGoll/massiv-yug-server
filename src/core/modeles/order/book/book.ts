import { Person } from "../../person/person";
import { BookDocument } from "../document/document";

type BookResults = {
  finishingSquare: number;
  facadeSquare: number;
  plateSquare: number;
  profileLinearMeters: number;
  chmzLinearMeters: number;
};

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

  results: BookResults = {
    finishingSquare: 0,
    facadeSquare: 0,
    plateSquare: 0,
    profileLinearMeters: 0,
    chmzLinearMeters: 0,
  };
  constructor() {}
}
