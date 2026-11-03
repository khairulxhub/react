import React from 'react';

export default function BuyersEdit() {
  return (
    <div>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="mb-1">Edit Buyer</h2>
            <p className="text-muted mb-0">
              Update buyer information
            </p>
          </div>

          <a href="/buyers" className="btn btn-secondary">
            ← Buyer List
          </a>

        </div>

        <div className="card">

          <div className="card-header">
            <h5 className="mb-0">
              Edit Buyer
            </h5>
          </div>

          <div className="card-body">

            <form>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">
                    Buyer Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="company_name"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Status <span className="text-danger">*</span>
                  </label>

                  <select
                    name="status"
                    className="form-select"
                    defaultValue="Active"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows={3}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    className="form-control"
                    rows={3}
                  />
                </div>

                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                  >
                    Update Buyer
                  </button>

                  <a href="/buyers" className="btn btn-secondary">
                    Cancel
                  </a>

                </div>

              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}