// src/accounts/AccountList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Account } from '../types';
import { getAccounts, deleteAccount } from '../services/accountService';

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAccounts()
      .then(res => setAccounts(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load accounts');
      });
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    deleteAccount(id)
      .then(() => setAccounts(prev => prev.filter(a => a.id !== id)))
      .catch(err => {
        console.error(err);
        setError('Failed to delete account');
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Accounts</h2>
        <Link to="/accounts/add" className="btn btn-primary">
          Add Account
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Account Number</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(a => (
            <tr key={a.id}>
              <td>{a.accountNumber}</td>
              <td>{a.accountType}</td>
              <td>{a.balance}</td>
              <td>{a.customerId}</td>
              <td>
                <Link
                  to={`/accounts/${a.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Details
                </Link>
                <Link
                  to={`/accounts/edit/${a.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
