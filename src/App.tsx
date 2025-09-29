// src/App.tsx
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import CustomerList from './customers/CustomerList';
import CustomerForm from './customers/CustomerForm';
import CustomerDetails from './customers/CustomerDetails';
import CustomerEdit from './customers/CustomerEdit';
import AccountList from './accounts/AccountList';
import AccountDetails from './accounts/AccountDetails';
import AccountEdit from './accounts/AccountEdit';
import AccountForm from './accounts/AccountForm';
import TransactionDetails from './transactions/TransactionDetails';
import TransactionEdit from './transactions/TransactionEdit';
import TransactionForm from './transactions/TransactionForm';
import TransactionList from './transactions/TransactionList';
import LoanForm from './loans/LoanForm';
import LoanList from './loans/LoanList';
import LoanDetails from './loans/LoanDetails';
import LoanEdit from './loans/LoanEdit';

import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn, logout } from './services/authService';

function App() {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* ✅ Logo goes to /customers if logged in, else /login */}
          <Link className="navbar-brand" to={loggedIn ? '/customers' : '/login'}>
            NeoBank
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/customers">Customers</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/accounts">Accounts</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">Transactions</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/loans">Loans</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {!loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          {/* ✅ Home route now depends on login */}
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/customers" replace /> : <Navigate to="/login" replace />}
          />

          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes */}
          <Route path="/customers" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
          <Route path="/customers/add" element={<ProtectedRoute><CustomerForm /></ProtectedRoute>} />
          <Route path="/customers/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
          <Route path="/customers/edit/:id" element={<ProtectedRoute><CustomerEdit /></ProtectedRoute>} />

          <Route path="/accounts" element={<ProtectedRoute><AccountList /></ProtectedRoute>} />
          <Route path="/accounts/add" element={<ProtectedRoute><AccountForm /></ProtectedRoute>} />
          <Route path="/accounts/:id" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
          <Route path="/accounts/edit/:id" element={<ProtectedRoute><AccountEdit /></ProtectedRoute>} />

          <Route path="/transactions" element={<ProtectedRoute><TransactionList /></ProtectedRoute>} />
          <Route path="/transactions/add" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
          <Route path="/transactions/:id" element={<ProtectedRoute><TransactionDetails /></ProtectedRoute>} />
          <Route path="/transactions/edit/:id" element={<ProtectedRoute><TransactionEdit /></ProtectedRoute>} />

          <Route path="/loans" element={<ProtectedRoute><LoanList /></ProtectedRoute>} />
          <Route path="/loans/add" element={<ProtectedRoute><LoanForm /></ProtectedRoute>} />
          <Route path="/loans/:id" element={<ProtectedRoute><LoanDetails /></ProtectedRoute>} />
          <Route path="/loans/edit/:id" element={<ProtectedRoute><LoanEdit /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
