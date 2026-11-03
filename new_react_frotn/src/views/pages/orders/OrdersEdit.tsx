import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrdersEdit() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        order_number: '',
        po_number: '',
        buyer_name: '',
        style_number: '',
        product_name: '',
        order_type: '',
        order_qty: '',
        unit_price: '',
        order_date: '',
        ex_factory_date: '',
        status: 'Pending',
        notes: ''
    });

    useEffect(() => {
        // Load existing order data here using the order ID.
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const totalValue =
        (Number(formData.order_qty) || 0) *
        (Number(formData.unit_price) || 0);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Add order update functionality here.
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                    <h1 className="h3 mb-1">Edit Garment Order</h1>
                    <p className="text-muted mb-0">
                        Update order information
                    </p>
                </div>

                <div>
                    <Link
                        to={`/orders/details/${id}`}
                        className="btn btn-info me-2"
                    >
                        <i data-feather="eye"></i>
                        View
                    </Link>

                    <Link to="/orders/manage" className="btn btn-secondary">
                        <i data-feather="arrow-left"></i>
                        Back
                    </Link>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    <h5 className="card-title mb-0">
                        Edit Order Information
                    </h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <h5 className="mb-3">
                            Order Information
                        </h5>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label htmlFor="order_number" className="form-label">
                                    Order Number <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="order_number"
                                    id="order_number"
                                    className="form-control"
                                    value={formData.order_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="po_number" className="form-label">
                                    PO Number
                                </label>

                                <input
                                    type="text"
                                    name="po_number"
                                    id="po_number"
                                    className="form-control"
                                    value={formData.po_number}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="buyer_name" className="form-label">
                                    Buyer Name <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="buyer_name"
                                    id="buyer_name"
                                    className="form-control"
                                    value={formData.buyer_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="style_number" className="form-label">
                                    Style Number
                                </label>

                                <input
                                    type="text"
                                    name="style_number"
                                    id="style_number"
                                    className="form-control"
                                    value={formData.style_number}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="product_name" className="form-label">
                                    Product Name <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="product_name"
                                    id="product_name"
                                    className="form-control"
                                    value={formData.product_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="order_type" className="form-label">
                                    Order Type
                                </label>

                                <select
                                    name="order_type"
                                    id="order_type"
                                    className="form-select"
                                    value={formData.order_type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Order Type</option>
                                    <option value="FOB">FOB</option>
                                    <option value="CM">CM</option>
                                    <option value="CMT">CMT</option>
                                    <option value="Export">Export</option>
                                </select>
                            </div>

                        </div>

                        <hr className="my-4" />

                        <h5 className="mb-3">
                            Quantity & Price
                        </h5>

                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label htmlFor="order_qty" className="form-label">
                                    Order Quantity <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="number"
                                    name="order_qty"
                                    id="order_qty"
                                    className="form-control"
                                    value={formData.order_qty}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="unit_price" className="form-label">
                                    Unit Price ($) <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="number"
                                    name="unit_price"
                                    id="unit_price"
                                    className="form-control"
                                    value={formData.unit_price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="total_value" className="form-label">
                                    Total Value ($)
                                </label>

                                <input
                                    type="number"
                                    name="total_value"
                                    id="total_value"
                                    className="form-control"
                                    value={totalValue.toFixed(2)}
                                    readOnly
                                />

                                <small className="text-muted">
                                    Automatically calculated
                                </small>
                            </div>

                        </div>

                        <hr className="my-4" />

                        <h5 className="mb-3">
                            Order Schedule
                        </h5>

                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label htmlFor="order_date" className="form-label">
                                    Order Date <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="date"
                                    name="order_date"
                                    id="order_date"
                                    className="form-control"
                                    value={formData.order_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="ex_factory_date" className="form-label">
                                    Ex-Factory Date
                                </label>

                                <input
                                    type="date"
                                    name="ex_factory_date"
                                    id="ex_factory_date"
                                    className="form-control"
                                    value={formData.ex_factory_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status <span className="text-danger">*</span>
                                </label>

                                <select
                                    name="status"
                                    id="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="notes" className="form-label">
                                Notes
                            </label>

                            <textarea
                                name="notes"
                                id="notes"
                                rows={4}
                                className="form-control"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <Link to="/orders/manage" className="btn btn-secondary">
                                Cancel
                            </Link>

                            <button type="submit" className="btn btn-primary">
                                <i data-feather="save"></i>
                                Update Order
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}
