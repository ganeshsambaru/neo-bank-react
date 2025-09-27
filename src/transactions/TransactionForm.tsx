import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Transaction } from '../types';
import { addTransaction } from '../services/transactionService';
import { getAccounts } from '../services/accountService';
import type { Account } from '../types';

export default function TransactionForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    transactionType: string;
    amount: string;
    transactionDate: string;
    accountId: string;
  }>({
    transactionType: '',
    amount: '0',
    transactionDate: '',
    accountId: '',
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [error, setError] = useState('');

  useEffect(() => {
    getAccounts()
      .then(res => setAccounts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isInvalid = (field: keyof typeof form) => {
    if (field === 'amount') return Number(form.amount) <= 0 || isNaN(Number(form.amount));
    if (field === 'accountId') return Number(form.accountId) <= 0 || isNaN(Number(form.accountId));
    return form[field].trim() === '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      transactionType: true,
      amount: true,
      transactionDate: true,
      accountId: true,
    });

    if (
      isInvalid('transactionType') ||
      isInvalid('amount') ||
      isInvalid('transactionDate') ||
      isInvalid('accountId')
    ) {
      setError('Please fix errors before submitting');
      return;
    }

    addTransaction({
      transactionType: form.transactionType,
      amount: Number(form.amount),
      transactionDate: form.transactionDate,
      accountId: Number(form.accountId),
    } as Omit<Transaction, 'id'>)
      .then(() => {
        alert('Transaction added successfully');
        navigate('/transactions');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to add transaction');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Transaction</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* transactionType dropdown */}
        <div className="col-md-6">
          <label className="form-label">Transaction Type</label>
          <select
            className="form-select"
            name="transactionType"
            value={form.transactionType}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">-- Select --</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
          {touched.transactionType && isInvalid('transactionType') && (
            <div className="text-danger">Transaction Type is required</div>
          )}
        </div>

        {/* amount */}
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            className="form-control"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.amount && isInvalid('amount') && (
            <div className="text-danger">Amount must be greater than 0</div>
          )}
        </div>

        {/* transactionDate */}
        <div className="col-md-6">
          <label className="form-label">Transaction Date</label>
          <input
            className="form-control"
            name="transactionDate"
            type="datetime-local"
            value={form.transactionDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.transactionDate && isInvalid('transactionDate') && (
            <div className="text-danger">Date is required</div>
          )}
        </div>

        {/* account dropdown */}
        <div className="col-md-6">
          <label className="form-label">Account</label>
          <select
            className="form-select"
            name="accountId"
            value={form.accountId}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">-- Select Account --</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.accountNumber} (Balance: {acc.balance.toFixed(2)})
              </option>
            ))}
          </select>
          {touched.accountId && isInvalid('accountId') && (
            <div className="text-danger">Account is required</div>
          )}
        </div>

        <div className="col-12 mt-2">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={
              isInvalid('transactionType') ||
              isInvalid('amount') ||
              isInvalid('transactionDate') ||
              isInvalid('accountId')
            }
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/transactions')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
