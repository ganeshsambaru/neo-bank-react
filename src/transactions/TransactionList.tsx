import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Transaction } from '../types';
import { getTransactions, deleteTransaction } from '../services/transactionService';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTransactions()
      .then(res => setTransactions(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load transactions');
      });
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    deleteTransaction(id)
      .then(() => setTransactions(prev => prev.filter(t => t.id !== id)))
      .catch(err => {
        console.error(err);
        setError('Failed to delete transaction');
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Transactions</h2>
        <Link to="/transactions/add" className="btn btn-primary">
          Add Transaction
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Account ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.transactionType}</td>
              <td>{t.amount}</td>
              <td>{new Date(t.transactionDate).toLocaleDateString()}</td>
              <td>{t.accountId}</td>
              <td>
                <Link to={`/transactions/${t.id}`} className="btn btn-sm btn-info me-2">
                  Details
                </Link>
                <Link to={`/transactions/edit/${t.id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>
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
