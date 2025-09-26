// src/customers/CustomerEdit.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Customer } from '../types';
import { getCustomer, updateCustomer } from '../services/customerService'; // ✅ use getCustomer

export default function CustomerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Customer, 'id'>>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getCustomer(Number(id))
        .then((res) => {
          // axios returns { data: Customer }
          const { fullName, email, phone, address } = res.data;
          setForm({ fullName, email, phone, address });
          setLoading(false);
          setError('');
        })
        .catch((err: unknown) => {
          console.error(err);
          setError('Could not load customer data');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isInvalid = (name: keyof typeof form) => {
    if (name === 'email') {
      return !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
    return form[name].trim() === '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
    });

    if (isInvalid('fullName') || isInvalid('email')) {
      setError('Please fix errors before submitting');
      return;
    }

    if (id) {
      // spread id back in so it matches Customer type
      const customerToUpdate: Customer = { id: Number(id), ...form };
      updateCustomer(Number(id), customerToUpdate)
        .then(() => {
          alert('Customer updated successfully');
          navigate('/customers');
        })
        .catch((err: unknown) => {
          console.error(err);
          setError('Failed to update customer');
        });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Edit Customer</h2>

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
            type="email"
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
          {touched.phone && !form.phone && (
            <div className="text-danger">Phone is required</div>
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
          {touched.address && !form.address && (
            <div className="text-danger">Address is required</div>
          )}
        </div>

        <div className="col-12 mt-2">
          <button
            type="submit"
            className="btn btn-success me-2"
            disabled={isInvalid('fullName') || isInvalid('email')}
          >
            Update
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
