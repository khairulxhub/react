
import React, { useState } from "react";

export default function EditStyle({
    style,
    buyers = [],
    updateUrl,
    indexUrl,
    csrfToken,
    errors = {},
}) {
    const [form, setForm] = useState({
        style_name: style.style_name ?? "",
        style_no: style.style_no ?? "",
        buyer_id: style.buyer_id ?? "",
        season: style.season ?? "",
        status: style.status ?? "active",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        setLoading(true);
    };

    const fieldError = (name) => {
        const error = errors[name];

        if (!error) return null;

        return (
            <div className="invalid-feedback">
                {Array.isArray(error) ? error[0] : error}
            </div>
        );
    };

    return (
        <div className="container-fluid py-4">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="mb-1">Edit Style</h4>
                    <p className="text-muted mb-0">
                        Update style information
                    </p>
                </div>

                <a href={indexUrl} className="btn btn-light border">
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Styles
                </a>
            </div>

            {/* Validation Errors */}
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <strong>Please fix the following errors:</strong>

                    <ul className="mb-0 mt-2">
                        {Object.entries(errors).flatMap(([key, value]) =>
                            (Array.isArray(value) ? value : [value]).map(
                                (message, index) => (
                                    <li key={`${key}-${index}`}>
                                        {message}
                                    </li>
                                )
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* Edit Style Card */}
            <div className="card border-0 shadow-sm">

                <div className="card-header bg-white py-3">
                    <h5 className="mb-0">
                        <i className="bi bi-pencil-square me-2"></i>
                        Style Information
                    </h5>
                </div>

                <div className="card-body">

                    <form
                        action={updateUrl}
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="_token"
                            value={csrfToken}
                        />

                        <input
                            type="hidden"
                            name="_method"
                            value="PUT"
                        />

                        <div className="row g-3">

                            {/* Style Name */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Style Name{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="style_name"
                                    // className={`form-control ${
                                    //     errors.style_name ? "is-invalid" : ""
                                    // }`}
                                    value={form.style_name}
                                    onChange={handleChange}
                                    placeholder="Enter style name"
                                    required
                                />

                                {fieldError("style_name")}
                            </div>

                            {/* Style No */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Style No{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="style_no"
                                    // className={`form-control ${
                                    //     errors.style_no ? "is-invalid" : ""
                                    // }`}
                                    value={form.style_no}
                                    onChange={handleChange}
                                    placeholder="Example: ST-001"
                                    required
                                />

                                {fieldError("style_no")}
                            </div>

                            {/* Buyer */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Buyer
                                </label>

                                <select
                                    name="buyer_id"
                                    // className={`form-select ${
                                    //     errors.buyer_id ? "is-invalid" : ""
                                    // }`}
                                    value={form.buyer_id}
                                    onChange={handleChange}
                                >
                                    {/* <option value="">Select Buyer</option>

                                    {buyers.map((buyer) => (
                                        <option
                                            key={buyer.id}
                                            value={buyer.id}
                                        >
                                            {buyer.name}
                                            {buyer.company_name
                                                ? ` - ${buyer.company_name}`
                                                : ""}
                                        </option> */}
                                    {/* ))} */}
                                </select>

                                {fieldError("buyer_id")}
                            </div>

                            {/* Season */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Season
                                </label>

                                <input
                                    type="text"
                                    name="season"
                                    // className={`form-control ${
                                    //     errors.season ? "is-invalid" : ""
                                    // }`}
                                    value={form.season}
                                    onChange={handleChange}
                                    placeholder="Example: Spring 2026"
                                />

                                {fieldError("season")}
                            </div>

                            {/* Status */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Status{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <select
                                    name="status"
                                    // className={`form-select ${
                                    //     errors.status ? "is-invalid" : ""
                                    // }`}
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {fieldError("status")}
                            </div>

                            {/* Buttons */}
                            <div className="col-12">
                                <hr />

                                <div className="d-flex justify-content-end gap-2">
                                    <a
                                        href={indexUrl}
                                        className="btn btn-light border"
                                    >
                                        Cancel
                                    </a>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-1"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-save me-1"></i>
                                                Update Style
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
