import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerEdit() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  // load existing customer data
  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7168/api/customers/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`https://localhost:7168/api/customers/${id}`, form)
      .then(() => {
        alert('Customer updated');
        navigate('/customers');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input className="form-control" name="fullName" value={form.fullName} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input className="form-control" name="address" value={form.address} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success me-2">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/customers')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
