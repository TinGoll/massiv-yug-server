export class BankCreateInput {
  /** Название компании */
  companyName?: string;
  /** ИНН */
  inn?: string;
  /** Юридический адрес */
  legalAddress?: string;
  /** Кореспонденский счет. */
  correspondentAccount?: string;
  /** Расчетный счет */
  checkingAccount?: string;
  /** Банк */
  bank?: string;
  /** Бик */
  bik?: string;
}

export class BankUpdateInput {
  id: number;
  /** Название компании */
  companyName?: string;
  /** ИНН */
  inn?: string;
  /** Юридический адрес */
  legalAddress?: string;
  /** Кореспонденский счет. */
  correspondentAccount?: string;
  /** Расчетный счет */
  checkingAccount?: string;
  /** Банк */
  bank?: string;
  /** Бик */
  bik?: string;
}
