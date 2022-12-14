import { isPhoneNumber, isMobilePhone } from 'class-validator';

export class PhoneCreateInput {
  number: string;
}

export class PhoneUpdateInput {
  id: number;
  number?: string;
}
