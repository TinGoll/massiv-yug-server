import {
  BookDocumentType,
  DocumentExtraData,
  DocumentGlossiness,
  DocumentResultData,
} from 'src/core/@types/app.types';

export class DocumentCreateInput {
  documentType?: BookDocumentType;
  /** Глянцевость. */
  glossiness?: DocumentGlossiness;
  /** Результативные данные документа */
  resultData?: DocumentResultData;
  extraData?: DocumentExtraData;
  /** Комментарий / примечание */
  note?: string;
}
export class DocumentUpdateInput {
  id: number;
  documentType?: BookDocumentType;
  /** Глянцевость. */
  glossiness?: DocumentGlossiness;
  /** Результативные данные документа */
  resultData?: DocumentResultData;
  extraData?: DocumentExtraData;
  /** Комментарий / примечание */
  note?: string;
}
