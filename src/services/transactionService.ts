import axios from 'axios';
import type { Transaction } from '../types';

const API_URL = 'https://localhost:7168/api/transactions';

export const getTransactions = () => axios.get<Transaction[]>(API_URL);

export const getTransaction = (id: number) =>
  axios.get<Transaction>(`${API_URL}/${id}`);

// 🔑 Add accepts Omit<Transaction, 'id'>
export const addTransaction = (transaction: Omit<Transaction, 'id'>) =>
  axios.post(API_URL, transaction);

// 🔑 Update accepts Omit<Transaction, 'id'>
export const updateTransaction = (id: number, transaction: Omit<Transaction, 'id'>) =>
  axios.put(`${API_URL}/${id}`, transaction);

export const deleteTransaction = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
