import {
  BookDocumentType,
  DocumentGlossiness,
} from 'src/core/types/model-types/document-types';

export class CreateDocumentInput {
  documentType: BookDocumentType;
  /** Глянцевость. */
  glossiness?: DocumentGlossiness;
  resultData?: object;
  note?: string;
}
