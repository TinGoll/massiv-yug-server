import { Entity } from "yug-entity-component-system";
import { BookDocument } from "../document/document";

export class DocumentElement extends Entity {
  id: number | null = null;
  documentId: number | null = null;
  document: BookDocument | null = null;
  constructor() {
    super();
  }
}
