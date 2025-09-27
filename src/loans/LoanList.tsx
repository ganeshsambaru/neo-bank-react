import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Loan } from '../types';
import { getLoans, deleteLoan } from '../services/loanService';

export default function LoanList() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getLoans()
      .then(res => setLoans(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load loans');
      });
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this loan?')) return;
    deleteLoan(id)
      .then(() => setLoans(prev => prev.filter(l => l.id !== id)))
      .catch(err => {
        console.error(err);
        setError('Failed to delete loan');
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Loans</h2>
        <Link to="/loans/add" className="btn btn-primary">
          Add Loan
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Amount</th>
            <th>Interest Rate</th>
            <th>Term (Months)</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(l => (
            <tr key={l.id}>
              <td>{l.amount}</td>
              <td>{l.interestRate}%</td>
              <td>{l.termMonths}</td>
              <td>{new Date(l.startDate).toLocaleDateString()}</td>
              <td>{new Date(l.endDate).toLocaleDateString()}</td>
              <td>{l.customerId}</td>
              <td>
                <Link to={`/loans/${l.id}`} className="btn btn-sm btn-info me-2">
                  Details
                </Link>
                <Link to={`/loans/edit/${l.id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(l.id)}
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
