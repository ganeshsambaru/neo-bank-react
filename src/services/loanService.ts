import axios from 'axios';
import type { Loan } from '../types';

const API_URL = 'https://localhost:7168/api/loans';

export const getLoans = () => axios.get<Loan[]>(API_URL);

export const getLoan = (id: number) => axios.get<Loan>(`${API_URL}/${id}`);

export const addLoan = (loan: Omit<Loan, 'id'>) =>
  axios.post(API_URL, loan);

export const updateLoan = (id: number, loan: Omit<Loan, 'id'>) =>
  axios.put(`${API_URL}/${id}`, loan);

export const deleteLoan = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
