import { ClientExtraData, PayType } from "../entities/person.client.account.entity";

export class ClientAccountCreateInput {
  alternativeName: string;
  companyName?: string;
  comment?: string;
  managerId?: number;
  payType?: PayType;
  webSite?: string;
  extraData?: ClientExtraData;
}

export class ClientAccountUpdateInput {
  id: number;
  alternativeName?: string;
  companyName?: string;
  comment?: string;
  managerId?: number;
  payType?: PayType;
  webSite?: string;
  extraData?: ClientExtraData;
}
