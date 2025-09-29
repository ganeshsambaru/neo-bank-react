import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const navigate = useNavigate();

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // simple validation rules
  const errors = {
    email: !/\S+@\S+\.\S+/.test(email) ? 'Enter a valid email' : '',
    password: password.length < 6 ? 'Password is required (min 6 chars)' : ''
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if errors exist, show them
    if (errors.email || errors.password) {
      setTouched({ email: true, password: true });
      return;
    }
    try {
      await login(email, password);
      navigate('/customers'); // after login
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
            />
            {touched.email && errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
            />
            {touched.password && errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
