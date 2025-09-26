// src/services/customerService.ts
import axios from 'axios';
import type { Customer } from '../types';

const API_URL = 'https://localhost:7168/api/customers';

// fetch all
export const getCustomers = () => axios.get<Customer[]>(API_URL);

// fetch one by id
export const getCustomer = (id: number) => axios.get<Customer>(`${API_URL}/${id}`);

// create new (no id required)
export const createCustomer = (customer: Omit<Customer, 'id'>) =>
  axios.post(API_URL, customer);

// update existing (no id required in body)
export const updateCustomer = (id: number, customer: Omit<Customer, 'id'>) =>
  axios.put(`${API_URL}/${id}`, customer);

// delete
export const deleteCustomer = (id: number) => axios.delete(`${API_URL}/${id}`);
