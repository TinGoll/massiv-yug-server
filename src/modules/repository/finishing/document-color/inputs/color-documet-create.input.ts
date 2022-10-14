export class ColorDocumentCreateInput {
  value?: number;
  converterId?: number;
  sampleId: number;
  documentId: number;
  previousName?: string;
  data?: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };
}
