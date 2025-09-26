// src/customers/CustomerList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Customer } from '../types';               // <-- use interface from types.ts
import { getCustomers, deleteCustomer as delCustomer } from '../services/customerService'; // <-- service

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // fetch all customers from service
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteCustomer = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    delCustomer(id)
      .then(() => setCustomers(c => c.filter(x => x.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      {/* Heading and Add button aligned like Accounts */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Customers</h2>
        <Link to="/customers/add" className="btn btn-primary">
          Add Customer
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                <Link
                  to={`/customers/${c.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Details
                </Link>
                <Link
                  to={`/customers/edit/${c.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteCustomer(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
