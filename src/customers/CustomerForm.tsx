// src/customers/CustomerForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Customer } from '../types';
import { createCustomer } from '../services/customerService'; // <-- service function

export default function CustomerForm() {
  const [form, setForm] = useState<Omit<Customer, 'id'>>({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isInvalid = (field: string) => {
    switch (field) {
      case 'email':
        return !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      default:
        return form[field as keyof typeof form].trim() === '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mark all touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true
    });

    // if invalid don’t submit
    if (
      isInvalid('fullName') ||
      isInvalid('email') ||
      isInvalid('phone') ||
      isInvalid('address')
    ) {
      setError('Please fix the errors before saving.');
      return;
    }

    createCustomer(form)
      .then(() => {
        alert('Customer added');
        navigate('/customers');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to save customer');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Customer</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fullName && isInvalid('fullName') && (
            <div className="text-danger">Full Name is required</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && isInvalid('email') && (
            <div className="text-danger">Enter a valid email</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && isInvalid('phone') && (
            <div className="text-danger">Phone number is required</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.address && isInvalid('address') && (
            <div className="text-danger">Address is required</div>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={
              isInvalid('fullName') ||
              isInvalid('email') ||
              isInvalid('phone') ||
              isInvalid('address')
            }
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/customers')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
