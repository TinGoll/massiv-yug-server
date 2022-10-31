export class ColorDocumentCreateInput {
  value?: number;
  converterId?: number;
  previousName?: string;
  data?: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };
}
