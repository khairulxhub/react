import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrdersDetails() {
    const { id } = useParams();

    const [order] = useState(null);
    const [showPdfModal, setShowPdfModal] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending':
                return <span className="badge bg-warning fs-6">Pending</span>;

            case 'In Progress':
                return <span className="badge bg-primary fs-6">In Progress</span>;

            case 'Completed':
                return <span className="badge bg-success fs-6">Completed</span>;

            case 'Cancelled':
                return <span className="badge bg-danger fs-6">Cancelled</span>;

            default:
                return <span className="badge bg-secondary fs-6">{status}</span>;
        }
    };

    const formatDate = (date : number) => {
        if (!date) return '-';

        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    if (!order) {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h1 className="h3 mb-1">Order Details</h1>
                        <p className="text-muted mb-0">
                            View garment order information
                        </p>
                    </div>

                    <Link to="/orders/manage" className="btn btn-secondary">
                        <i data-feather="arrow-left"></i>
                        Back to Orders
                    </Link>
                </div>

                <div className="alert alert-info">
                    Order information will appear here once order data is loaded.
                    Order ID: {id}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                    <h1 className="h3 mb-1">Order Details</h1>
                    <p className="text-muted mb-0">
                        View garment order information
                    </p>
                </div>

                <div>
                    <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => setShowPdfModal(true)}
                    >
                        <i data-feather="file-text"></i>
                        PDF Preview
                    </button>

                    <Link
                        to={``}
                        className="btn btn-warning me-2"
                    >
                        <i data-feather="edit-2"></i>
                        Edit Order
                    </Link>

                    <Link to="/orders/manage" className="btn btn-secondary">
                        <i data-feather="arrow-left"></i>
                        Back to Orders
                    </Link>
                </div>

            </div>

            <div className="row">

                <div className="col-md-8">

                    <div className="card">

                        <div className="card-header">
                            <h5 className="card-title mb-0">
                                Order Information
                            </h5>
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        Order Number
                                    </label>
                                    <div className="fw-bold">
                                        {/* {order.order_number} */}
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        PO Number
                                    </label>
                                    {/* <div>{order.po_number || '-'}</div> */}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        Buyer Name
                                    </label>
                                    {/* <div>{order.buyer_name}</div> */}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        Style Number
                                    </label>
                                    {/* <div>{order.style_number || '-'}</div> */}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        Product Name
                                    </label>
                                    {/* <div>{order.product_name}</div> */}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-muted">
                                        Order Type
                                    </label>
                                    {/* <div>{order.order_type || '-'}</div> */}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-header">
                            <h5 className="card-title mb-0">
                                Order Status
                            </h5>
                        </div>

                        <div className="card-body text-center">
                            {/* {getStatusBadge(order.status)} */}
                        </div>

                    </div>

                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    <h5 className="card-title mb-0">
                        Quantity & Price
                    </h5>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4">
                            <div className="text-muted">
                                Order Quantity
                            </div>
                            <h4>
                                {/* {Number(order.order_qty).toLocaleString()} pcs */}
                            </h4>
                        </div>

                        <div className="col-md-4">
                            <div className="text-muted">
                                Unit Price
                            </div>
                            {/* <h4>
                                ${Number(order.unit_price).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </h4> */}
                        </div>

                        <div className="col-md-4">
                            <div className="text-muted">
                                Total Value
                            </div>
                            {/* <h4>
                                ${Number(order.total_value).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </h4> */}
                        </div>

                    </div>

                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    <h5 className="card-title mb-0">
                        Order Schedule
                    </h5>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">
                            <div className="text-muted">
                                Order Date
                            </div>
                            <div className="fw-bold">
                                {/* {formatDate(order.order_date)} */}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="text-muted">
                                Ex-Factory Date
                            </div>
                            <div className="fw-bold">
                                {/* {formatDate(order.ex_factory_date)} */}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
{/* 
            {order.notes && (
                <div className="card">

                    <div className="card-header">
                        <h5 className="card-title mb-0">
                            Notes
                        </h5>
                    </div>

                    <div className="card-body">
                        {order.notes}
                    </div>

                </div>
            )} */}
{/* 
            {showPdfModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="pdfPreviewModalLabel"
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5
                                    className="modal-title"
                                    id="pdfPreviewModalLabel"
                                >
                                    <i data-feather="file-text"></i>
                                    Garment Order PDF Preview
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowPdfModal(false)}
                                />

                            </div>

                            <div className="modal-body p-0">

                                <iframe
                                    src={`/orders/${order.id}/pdf/preview`}
                                    title="Garment Order PDF Preview"
                                    width="100%"
                                    height="650"
                                    style={{ border: 'none' }}
                                />

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowPdfModal(false)}
                                >
                                    <i data-feather="x"></i>
                                    Close
                                </button>

                                <a
                                    href={`/orders/${order.id}/pdf/download`}
                                    className="btn btn-danger"
                                >
                                    <i data-feather="download"></i>
                                    Download PDF
                                </a>

                            </div>

                        </div>

                    </div>

                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowPdfModal(false)}
                    />

                </div>
            )} */}

        </div>
    );
}
