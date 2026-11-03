
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialBuyers = [
  {
    id: 1,
    name: 'Rahim Ahmed',
    email: 'rahim@example.com',
    company_name: 'ABC Garments Ltd.',
    phone: '01712345678',
    country: 'Bangladesh',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Karim Hasan',
    email: 'karim@example.com',
    company_name: 'XYZ Fashion',
    phone: '01812345678',
    country: 'USA',
    status: 'Inactive'
  }
];

export default function BuyersManage() {
  const [buyers, setBuyers] = useState(initialBuyers);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  const filteredBuyers = useMemo(() => {
    return buyers.filter((buyer) => {
      const keyword = search.toLowerCase();

      const matchesSearch = [
        buyer.name,
        buyer.email,
        buyer.company_name,
        buyer.phone,
        buyer.country
      ].some((value) => (value || '').toLowerCase().includes(keyword));

      const matchesStatus = !status || buyer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [buyers, search, status]);

  const handleDelete = (id : number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this buyer?'
    );

    if (!confirmed) return;

    setBuyers((prev) => prev.filter((buyer) => buyer.id !== id));
    setSuccess('Buyer deleted successfully.');
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Buyers</h1>
          <p className="text-muted mb-0">
            Manage all garment buyers
          </p>
        </div>

        <Link to="/buyers/create" className="btn btn-primary">
          <i data-feather="plus" className="me-1" />
          Add Buyer
        </Link>
      </div>

      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess('')}
            aria-label="Close"
          />
        </div>
      )}

      <div className="card mb-3">
        <div className="card-body">
          <form
            onSubmit={(e) => e.preventDefault()}
            onReset={handleReset}
          >
            <div className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search buyer, company, email or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  <i data-feather="search" className="me-1" />
                  Search
                </button>
              </div>

              <div className="col-md-2">
                <button
                  type="reset"
                  className="btn btn-light border w-100"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title mb-0">
            Buyer List ({filteredBuyers.length})
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Buyer</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBuyers.length > 0 ? (
                  filteredBuyers.map((buyer, index) => (
                    <tr key={buyer.id}>
                      <td>{index + 1}</td>

                      <td>
                        <strong>{buyer.name}</strong>
                        {buyer.email && (
                          <div className="small text-muted">
                            {buyer.email}
                          </div>
                        )}
                      </td>

                      <td>{buyer.company_name || '-'}</td>
                      <td>{buyer.phone || '-'}</td>
                      <td>{buyer.country || '-'}</td>

                      <td>
                        <span
                          className={`badge ${
                            buyer.status === 'Active'
                              ? 'bg-success'
                              : 'bg-secondary'
                          }`}
                        >
                          {buyer.status}
                        </span>
                      </td>

                      <td className="text-end">
                        <div className="btn-group">
                          <Link
                            to={`/buyers/${buyer.id}`}
                            className="btn btn-sm btn-outline-info"
                            title="View"
                          >
                            <i data-feather="eye" />
                          </Link>

                          <Link
                            to={`/buyers/edit/${buyer.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i data-feather="edit-2" />
                          </Link>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                            onClick={() => handleDelete(buyer.id)}
                          >
                            <i data-feather="trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      <i
                        data-feather="users"
                        style={{ width: 40, height: 40 }}
                      />
                      <h5 className="mt-3">No buyers found</h5>
                      <p className="text-muted mb-3">
                        Start by adding your first buyer.
                      </p>
                      <Link
                        to="/buyers/create"
                        className="btn btn-primary"
                      >
                        Add Buyer
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
