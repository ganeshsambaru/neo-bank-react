import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Loan } from '../types';
import { getLoan } from '../services/loanService';

export default function LoanDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getLoan(Number(id))
        .then(res => setLoan(res.data))
        .catch(err => {
          console.error(err);
          setError('Could not load loan details');
        });
    }
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!loan) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Loan Details</h2>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{loan.id}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{loan.amount}</td>
          </tr>
          <tr>
            <th>Interest Rate (%)</th>
            <td>{loan.interestRate}</td>
          </tr>
          <tr>
            <th>Term (Months)</th>
            <td>{loan.termMonths}</td>
          </tr>
          <tr>
            <th>Start Date</th>
            <td>{new Date(loan.startDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>End Date</th>
            <td>{loan.endDate ? new Date(loan.endDate).toLocaleDateString() : '-'}</td>
          </tr>
          <tr>
            <th>Customer ID</th>
            <td>{loan.customerId}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-3">
        <Link to={`/loans/edit/${loan.id}`} className="btn btn-warning me-2">
          Edit
        </Link>
        <button className="btn btn-secondary" onClick={() => navigate('/loans')}>
          Back
        </button>
      </div>
    </div>
  );
}
