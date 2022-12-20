export class PersonBarcodeCreateInput {
  barcode: string;
}

export class PersonBarcodeUpdateInput {
  id: number;
  barcode?: string;
}
