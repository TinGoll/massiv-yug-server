import { Panel } from "../../panel/Panel";
import { Color } from "src/core/modeles/finishing/color/Color";
import { Material } from "src/core/modeles/msterial/Material";
import { Profile } from "src/core/modeles/profile/Profile";
import { Patina } from "../../finishing/patina/patina";
import { Varnish } from "../../finishing/varnish/varnish";
import { Book } from "../book/book";
import { DocumentElement } from "../element/element";
import { BookDocumentCreateInput } from "src/core/types/inputs/order-inputs/document-inputs/book.document.create.input";

type DocumentResults = {
  finishingSquare: number;
  facadeSquare: number;
  plateSquare: number;
  profileLinearMeters: number;
  chmzLinearMeters: number;
};

type DocumentFinishing = {
  color: Color | null;
  patina: Patina | null;
  varnis: Varnish | null;
};

interface DocumentState {

}

export class BookDocument {
  id: number = null;
  bookId: number | null = null;
  book: Book | null = null;

  createdAt: Date;
  updatedAt: Date;

  material: Material | null = null;
  profile: Profile | null = null;
  panel: Panel | null = null;

  finishing: DocumentFinishing = {
    color: null,
    patina: null,
    varnis: null,
  };

  results: DocumentResults = {
    finishingSquare: 0,
    facadeSquare: 0,
    plateSquare: 0,
    profileLinearMeters: 0,
    chmzLinearMeters: 0,
  };

  elements: DocumentElement[] = [];

  constructor() {}

  getState(): DocumentState {
    return {
      ...this,
      finishing: {
        ...this.finishing,
      },
      elements: this.elements.map((e) => e.getState()),
    };
  }

  createElement(): DocumentElement {
    const element = new DocumentElement();
    element.documentId = this.id;
    element.document = this;
    return element;
  }
}
