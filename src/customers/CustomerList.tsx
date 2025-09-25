// src/customers/CustomerList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    axios
      .get<Customer[]>('https://localhost:7168/api/customers') // your backend URL
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteCustomer = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    axios
      .delete(`https://localhost:7168/api/customers/${id}`)
      .then(() => setCustomers(c => c.filter(x => x.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Customers</h2>
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
  <Link to={`/customers/${c.id}`} className="btn btn-sm btn-info me-2">Details</Link>
  <Link to={`/customers/edit/${c.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
  <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(c.id)}>Delete</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
