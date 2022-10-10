
export class ColorDocumentUpdateInput {
  id: number;
  value?: number;
  converterId?: number;
  sampleId?: number;
  documentId?: number;
  data?: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };
}