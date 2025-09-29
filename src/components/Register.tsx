import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const Register: React.FC = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(
        user.fullName,
        user.email,
        user.phone,
        user.password,
        user.role
      );
      navigate('/login'); // after registration go to login
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={user.fullName}
              onChange={e => setUser({ ...user, fullName: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={user.phone}
              onChange={e => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={user.role}
              onChange={e => setUser({ ...user, role: e.target.value })}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Manager">Manager</option>
              <option value="BankStaff">Bank Staff</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
