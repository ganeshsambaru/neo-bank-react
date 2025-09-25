// src/customers/CustomerDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get<Customer>(`https://localhost:7168/api/customers/${id}`)
        .then(res => {
          setCustomer(res.data);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Could not load customer details');
        });
    }
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      {/* Heading outside card */}
      <h2 className="mb-3">Customer Details</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">{customer.fullName}</h5>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>

          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={() => navigate('/customers')}
            >
              Back
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/customers/edit/${customer.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
