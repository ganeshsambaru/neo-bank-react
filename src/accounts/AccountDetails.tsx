// src/accounts/AccountDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Account } from '../types';
import { getAccount } from '../services/accountService';

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAccount(Number(id))
        .then(res => {
          setAccount(res.data);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Could not load account details');
        });
    }
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!account) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-3">Account Details</h2>

      <div className="card">
        <div className="card-body">
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>Type:</strong> {account.accountType}</p>
          <p><strong>Balance:</strong> {account.balance}</p>
          <p><strong>Customer ID:</strong> {account.customerId}</p>

          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={() => navigate('/accounts')}
            >
              Back
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/accounts/edit/${account.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
