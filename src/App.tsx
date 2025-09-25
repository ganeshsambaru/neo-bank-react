// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import CustomerList from './customers/CustomerList';
import CustomerForm from './customers/CustomerForm';
import CustomerDetails from './customers/CustomerDetails';
import CustomerEdit from './customers/CustomerEdit';

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
                <Link className="nav-link" to="/customers/add">Add Customer</Link>
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
        </Routes>
      </div>
    </>
  );
}

export default App;
