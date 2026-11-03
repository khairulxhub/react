
import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Demo data — পরে API থেকে data আনতে পারবেন
const buyersData = [
  {
    id: 1,
    name: 'Rahim Ahmed',
    company_name: 'ABC Garments Ltd.',
    email: 'rahim@example.com',
    phone: '01712345678',
    country: 'Bangladesh',
    status: 'Active',
    address: 'Uttara, Dhaka, Bangladesh',
    notes: 'Regular garment buyer',
    orders: 12
  },
  {
    id: 2,
    name: 'Karim Hasan',
    company_name: 'XYZ Fashion Ltd.',
    email: 'karim@example.com',
    phone: '01812345678',
    country: 'USA',
    status: 'Inactive',
    address: 'New York, USA',
    notes: 'Currently inactive',
    orders: 5
  }
];

export default function BuyersDetails() {
  const { id } = useParams();

  const buyer = buyersData.find(
    (item) => String(item.id) === String(id)
  );

  if (!buyer) {
    return (
      <div className="container-fluid py-4">
        <div className="card">
          <div className="card-body text-center py-5">
            <h4>Buyer Not Found</h4>
            <p className="text-muted">
              The buyer you are looking for does not exist.
            </p>
            <Link to="/buyers/manage" className="btn btn-primary">
              Back to Buyer List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="mb-1">Buyer Details</h2>
          <p className="text-muted mb-0">
            View buyer information
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link
            to={`/buyers/edit/${buyer.id}`}
            className="btn btn-warning"
          >
            Edit Buyer
          </Link>

          <Link
            to="/buyers/manage"
            className="btn btn-secondary"
          >
            &larr; Buyer List
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">{buyer.name}</h5>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <strong>Buyer Name</strong>
                  <p className="mt-1 mb-0">{buyer.name || '-'}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Company Name</strong>
                  <p className="mt-1 mb-0">
                    {buyer.company_name || '-'}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <strong>Email</strong>
                  <p className="mt-1 mb-0">
                    {buyer.email || '-'}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Phone</strong>
                  <p className="mt-1 mb-0">
                    {buyer.phone || '-'}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <strong>Country</strong>
                  <p className="mt-1 mb-0">
                    {buyer.country || '-'}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Status</strong>
                  <p className="mt-1">
                    <span
                      className={`badge ${
                        buyer.status === 'Active'
                          ? 'bg-success'
                          : 'bg-secondary'
                      }`}
                    >
                      {buyer.status || 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <strong>Address</strong>
                <p className="mt-1 mb-0">
                  {buyer.address || '-'}
                </p>
              </div>

              <div className="mb-2">
                <strong>Notes</strong>
                <p className="mt-1 mb-0">
                  {buyer.notes || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>

            <div className="card-body text-center py-4">
              <h3 className="mb-1">{buyer.orders ?? 0}</h3>
              <p className="text-muted mb-0">Total Orders</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h6>Quick Actions</h6>

              <div className="d-grid gap-2 mt-3">
                <Link
                  to={`/buyers/edit/${buyer.id}`}
                  className="btn btn-outline-primary"
                >
                  Edit Buyer Information
                </Link>

                <Link
                  to="/buyers/create"
                  className="btn btn-outline-secondary"
                >
                  Add New Buyer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
