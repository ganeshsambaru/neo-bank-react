import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Transaction } from '../types';
import { getTransaction } from '../services/transactionService';

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTransaction(Number(id))
        .then(res => {
          setTransaction(res.data);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Could not load transaction details');
        });
    }
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-3">Transaction Details</h2>
      <div className="card">
        <div className="card-body">
          <p><strong>Type:</strong> {transaction.transactionType}</p>
          <p><strong>Amount:</strong> {transaction.amount}</p>
          <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleDateString()}</p>
          <p><strong>Account ID:</strong> {transaction.accountId}</p>

          <div className="mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={() => navigate('/transactions')}
            >
              Back
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/transactions/edit/${transaction.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
