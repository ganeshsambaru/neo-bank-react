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
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validation rules
  const errors = {
    fullName: !user.fullName.trim() ? 'Full name is required' : '',
    email: !/\S+@\S+\.\S+/.test(user.email) ? 'Enter a valid email' : '',
   phone: !/^\d{10}$/.test(user.phone)
  ? 'Enter a 10-digit phone number'
  : '',

    password:
      user.password.length < 6 ? 'Password must be at least 6 characters' : '',
    role: !user.role ? 'Please select a role' : ''
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if any error, mark all as touched
    if (Object.values(errors).some(err => err !== '')) {
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        password: true,
        role: true
      });
      return;
    }

    try {
      await register(
        user.fullName,
        user.email,
        user.phone,
        user.password,
        user.role
      );
      alert('Registration successful! Please log in.');
      navigate('/login'); // after registration go to login
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit} noValidate>
          {/* Full name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={user.fullName}
              onChange={e => setUser({ ...user, fullName: e.target.value })}
              onBlur={() => handleBlur('fullName')}
            />
            {touched.fullName && errors.fullName && (
              <small className="text-danger">{errors.fullName}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              onBlur={() => handleBlur('email')}
            />
            {touched.email && errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={user.phone}
              onChange={e => setUser({ ...user, phone: e.target.value })}
              onBlur={() => handleBlur('phone')}
            />
            {touched.phone && errors.phone && (
              <small className="text-danger">{errors.phone}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              onBlur={() => handleBlur('password')}
            />
            {touched.password && errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Role */}
          <div className="mb-3">
            <select
              className="form-select"
              value={user.role}
              onChange={e => setUser({ ...user, role: e.target.value })}
              onBlur={() => handleBlur('role')}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Customer">Customer</option>
              <option value="Manager">Manager</option>
              <option value="BankStaff">Bank Staff</option>
            </select>
            {touched.role && errors.role && (
              <small className="text-danger">{errors.role}</small>
            )}
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
