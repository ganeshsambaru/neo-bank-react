import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Account } from '../types';
import { addAccount } from '../services/accountService';

export default function AccountForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Account, 'id'>>({
    accountNumber: '',
    accountType: '',
    balance: 0,
    customerId: 0,
  });

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // convert numbers properly
    setForm({ ...form, [name]: name === 'balance' || name === 'customerId' ? Number(value) : value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isInvalid = (field: keyof typeof form) => {
    if (field === 'balance') return form.balance < 0 || isNaN(form.balance);
    if (field === 'customerId') return form.customerId <= 0 || isNaN(form.customerId);
    return form[field].toString().trim() === '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      accountNumber: true,
      accountType: true,
      balance: true,
      customerId: true,
    });

    if (
      isInvalid('accountNumber') ||
      isInvalid('accountType') ||
      isInvalid('balance') ||
      isInvalid('customerId')
    ) {
      setError('Please fix errors before submitting');
      return;
    }

    addAccount(form)
      .then(() => {
        alert('Account added successfully');
        navigate('/accounts');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to add account');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* accountNumber */}
        <div className="col-md-6">
          <label className="form-label">Account Number</label>
          <input
            className="form-control"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.accountNumber && isInvalid('accountNumber') && (
            <div className="text-danger">Account Number is required</div>
          )}
        </div>

        {/* accountType */}
        <div className="col-md-6">
          <label className="form-label">Account Type</label>
          <input
            className="form-control"
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.accountType && isInvalid('accountType') && (
            <div className="text-danger">Account Type is required</div>
          )}
        </div>

        {/* balance */}
        <div className="col-md-6">
          <label className="form-label">Balance</label>
          <input
            className="form-control"
            name="balance"
            type="number"
            value={form.balance}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.balance && isInvalid('balance') && (
            <div className="text-danger">Balance must be 0 or greater</div>
          )}
        </div>

        {/* customerId */}
        <div className="col-md-6">
          <label className="form-label">Customer ID</label>
          <input
            className="form-control"
            name="customerId"
            type="number"
            value={form.customerId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.customerId && isInvalid('customerId') && (
            <div className="text-danger">Customer ID Required</div>
          )}
        </div>

        <div className="col-12 mt-2">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={
              isInvalid('accountNumber') ||
              isInvalid('accountType') ||
              isInvalid('balance') ||
              isInvalid('customerId')
            }
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/accounts')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
