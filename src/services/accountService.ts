// src/services/accountService.ts
import type { Account } from '../types';
import api from './api'; // ✅ using our shared axios instance

// All calls now go through `api` (not axios directly):

export const getAccounts = () =>
  api.get<Account[]>('/accounts');

export const getAccount = (id: number) =>
  api.get<Account>(`/accounts/${id}`);

export const addAccount = (account: Omit<Account, 'id'>) =>
  api.post('/accounts', account);

export const updateAccount = (id: number, account: Omit<Account, 'id'>) =>
  api.put(`/accounts/${id}`, account);

export const deleteAccount = (id: number) =>
  api.delete(`/accounts/${id}`);
