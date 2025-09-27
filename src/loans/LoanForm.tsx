import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addLoan } from '../services/loanService';
import type { Loan } from '../types';

export default function LoanForm() {
  const navigate = useNavigate();
  const [loan, setLoan] = useState<Omit<Loan, 'id'>>({
    amount: 0,
    interestRate: 0,
    termMonths: 0,
    startDate: '',
    endDate: '', // allow empty string instead of null
    customerId: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!loan.amount || loan.amount <= 0) newErrors.amount = 'Amount is required';
    if (!loan.interestRate || loan.interestRate <= 0) newErrors.interestRate = 'Interest rate is required';
    if (!loan.termMonths || loan.termMonths <= 0) newErrors.termMonths = 'Term is required';
    if (!loan.startDate) newErrors.startDate = 'Start date is required';
    // endDate is optional here — don’t validate it
    if (!loan.customerId || loan.customerId <= 0) newErrors.customerId = 'Customer ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan(prev => ({
      ...prev,
      [name]: ['amount', 'interestRate', 'termMonths', 'customerId'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addLoan(loan)
      .then(() => navigate('/loans'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Add Loan</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input type="number" name="amount" value={loan.amount} onChange={handleChange} className="form-control" />
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Interest Rate (%)</label>
          <input type="number" name="interestRate" value={loan.interestRate} onChange={handleChange} className="form-control" />
          {errors.interestRate && <div className="text-danger">{errors.interestRate}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Term (Months)</label>
          <input type="number" name="termMonths" value={loan.termMonths} onChange={handleChange} className="form-control" />
          {errors.termMonths && <div className="text-danger">{errors.termMonths}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Customer ID</label>
          <input type="number" name="customerId" value={loan.customerId} onChange={handleChange} className="form-control" />
          {errors.customerId && <div className="text-danger">{errors.customerId}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input type="datetime-local" name="startDate" value={loan.startDate} onChange={handleChange} className="form-control" />
          {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date (optional)</label>
          <input type="datetime-local" name="endDate" value={loan.endDate} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save</button>{' '}
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/loans')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
