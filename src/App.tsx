// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
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

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* changed container-fluid to container */}
        <div className="container">
          <Link className="navbar-brand" to="/">NeoBank</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers</Link>
              </li>
               <li className="nav-item">
              <Link className="nav-link" to="/accounts">Accounts</Link>
            </li>
             <li className="nav-item">
  <Link className="nav-link" to="/transactions">
    Transactions
  </Link>
</li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Use container for page content as well */}
      <div className="container mt-4">
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/edit/:id" element={<CustomerEdit />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/accounts/add" element={<AccountForm />} />
          <Route path="/accounts/:id" element={<AccountDetails />} />
          <Route path="/accounts/edit/:id" element={<AccountEdit />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/add" element={<TransactionForm />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/transactions/edit/:id" element={<TransactionEdit />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
