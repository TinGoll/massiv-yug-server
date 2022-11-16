export class BookStatusCreateInput {
  name: string;
  index?: number;
}
export class BookStatusUpdateInput {
  id: number;
  name?: string;
  index?: number;
}
