export interface BankEntry {
  id: number;
  shipId: string;
  year: number;
  amountGco2eq: number;
}

export interface BankingOperation {
  shipId: string;
  year: number;
  amount: number;
}

