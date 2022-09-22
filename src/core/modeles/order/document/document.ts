import { Panel } from "src/core/modeles/attachment/Panel";
import { Color } from "src/core/modeles/finishing/color/Color";
import { Material } from "src/core/modeles/msterial/Material";
import { Profile } from "src/core/modeles/profile/Profile";
import { Patina } from "../../finishing/patina/patina";
import { Varnish } from "../../finishing/varnish/varnish";
import { Book } from "../book/book";
import { DocumentElement } from "../element/element";

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

export class BookDocument {
  id: number = null;
  bookId: number | null = null;
  book: Book | null = null;

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

  constructor() {}

  createElement(): DocumentElement {
    const element = new DocumentElement();
    element.documentId = this.id;
    element.document = this;
    return element;
  }
}
