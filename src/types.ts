// src/types.ts
export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  customerId: number;
}

export interface Transaction {
  id: number;
  transactionType: string;
  amount: number;
  transactionDate: string; // ISO string
  accountId: number;
}