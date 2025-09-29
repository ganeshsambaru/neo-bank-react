// src/services/customerService.ts
import type { Customer } from '../types';
import api from './api'; // ✅ our shared axios instance with JWT interceptor

// fetch all customers
export const getCustomers = () =>
  api.get<Customer[]>('/customers');

// fetch one by id
export const getCustomer = (id: number) =>
  api.get<Customer>(`/customers/${id}`);

// create new (no id required)
export const createCustomer = (customer: Omit<Customer, 'id'>) =>
  api.post('/customers', customer);

// update existing (no id required in body)
export const updateCustomer = (id: number, customer: Omit<Customer, 'id'>) =>
  api.put(`/customers/${id}`, customer);

// delete
export const deleteCustomer = (id: number) =>
  api.delete(`/customers/${id}`);
