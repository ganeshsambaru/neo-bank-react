import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!form.fullName) newErrors.fullName = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone) newErrors.phone = 'Phone number is required';
    if (!form.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    axios.post('https://localhost:7168/api/customers', form)
      .then(() => {
        alert('Customer added');
        navigate('/customers');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to save customer');
      });
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input className="form-control" name="fullName" value={form.fullName} onChange={handleChange} />
          {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input className="form-control" name="address" value={form.address} onChange={handleChange} />
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/customers')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
