// src/services/loanService.ts
import type { Loan } from '../types';
import api from './api'; // ✅ shared axios instance with baseURL + JWT header

// fetch all loans
export const getLoans = () =>
  api.get<Loan[]>('/loans');

// fetch one loan by id
export const getLoan = (id: number) =>
  api.get<Loan>(`/loans/${id}`);

// create a new loan (no id in body)
export const addLoan = (loan: Omit<Loan, 'id'>) =>
  api.post('/loans', loan);

// update existing loan (no id in body)
export const updateLoan = (id: number, loan: Omit<Loan, 'id'>) =>
  api.put(`/loans/${id}`, loan);

// delete a loan
export const deleteLoan = (id: number) =>
  api.delete(`/loans/${id}`);
