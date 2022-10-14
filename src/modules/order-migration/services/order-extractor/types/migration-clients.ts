export interface MigrationClient {
  id: number;
  clientName: string;
  city: string;
  phone: string;
  phone2?: string;
  shortName: string;
  email?: string;
  email2?: string;

  priceColumn: number;

  comment?: string;
  companyName: string;
  inn: string;
  legalAddress: string;
  correspondentAccount: string;
  checkingAccount: string;
  bank: string;
  bik: string;

  manager?: string;

  payType?: string;
  webSite?: string;
  prepaid?: number;
  profiler?: number;
}
