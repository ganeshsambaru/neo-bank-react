// src/services/accountService.ts
import axios from 'axios';
import type { Account } from '../types';

const API_URL = 'https://localhost:7168/api/accounts';

export const getAccounts = () => axios.get<Account[]>(API_URL);

export const getAccount = (id: number) => axios.get<Account>(`${API_URL}/${id}`);

// 🔑 Add accepts Omit<Account, 'id'> (no id when creating)
export const addAccount = (account: Omit<Account, 'id'>) =>
  axios.post(API_URL, account);

// 🔑 Update also accepts Omit<Account, 'id'> (we send data without id; id is in URL)
export const updateAccount = (id: number, account: Omit<Account, 'id'>) =>
  axios.put(`${API_URL}/${id}`, account);

export const deleteAccount = (id: number) => axios.delete(`${API_URL}/${id}`);
