import { Panel } from "src/engine/core/models/attachment/Panel";
import { Color } from "src/engine/core/models/color/Color";
import { Material } from "src/engine/core/models/msterial/Material";
import { Profile } from "src/engine/core/models/profile/Profile";
import { Patina } from "../../finishing/patina/patina";
import { Varnish } from "../../finishing/varnish/varnish";
import { Book } from "../book/book";

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
  orderId: number | null = null;
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
}
