export class CardCreateInput {
  number: string;
  cardHolder?: string;
}

export class CardUpdateInput {
  id: number;
  number?: string;
  cardHolder?: string;
}
