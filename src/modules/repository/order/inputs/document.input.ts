import {
  BookDocumentType,
  DocumentGlossiness,
} from 'src/core/types/model-types/document-types';

export class DocumentCreateInput {
  documentType: BookDocumentType;
  /** Глянцевость. */
  glossiness?: DocumentGlossiness;
  resultData?: object;
  note?: string;
}

export class DocumentUpdateInput {
  id: number;
  documentType?: BookDocumentType;
  /** Глянцевость. */
  glossiness?: DocumentGlossiness;
  resultData?: object;
  note?: string;
}
