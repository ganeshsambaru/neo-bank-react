// src/services/transactionService.ts
import type { Transaction } from '../types';
import api from './api'; // ✅ shared axios instance with baseURL + JWT header

// fetch all transactions
export const getTransactions = () =>
  api.get<Transaction[]>('/transactions');

// fetch one transaction by id
export const getTransaction = (id: number) =>
  api.get<Transaction>(`/transactions/${id}`);

// create new transaction (no id in body)
export const addTransaction = (transaction: Omit<Transaction, 'id'>) =>
  api.post('/transactions', transaction);

// update existing transaction (no id in body)
export const updateTransaction = (id: number, transaction: Omit<Transaction, 'id'>) =>
  api.put(`/transactions/${id}`, transaction);

// delete transaction
export const deleteTransaction = (id: number) =>
  api.delete(`/transactions/${id}`);
