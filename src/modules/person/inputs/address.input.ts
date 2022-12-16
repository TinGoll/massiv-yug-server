export class AddressCreateInput {
  city: string;
  street?: string;
  house?: string;
  apartment?: string;
  postIndex?: string;
}

export class AddressUpdateInput {
  id: number;

  city?: string;

  street?: string;

  house?: string;

  apartment?: string;

  postIndex?: string;
}
