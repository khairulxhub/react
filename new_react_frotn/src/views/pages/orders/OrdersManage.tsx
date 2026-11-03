import React from 'react';
import { Link } from 'react-router-dom';

export default function OrdersManage() {
    const orders = [
        {
            id: 1,
            order_number: '12345',
            po_number: 'PO-001',
            buyer_name: 'John Doe',
            order_type: 'Garment',
            style_number: 'ST-001',
            product_name: 'T-Shirt',
            order_qty: 10,
            unit_price: 20,
            order_date: '2022-01-01',
    }];

    const getStatusBadge = (status : string) => {
        switch (status) {
            case 'Pending':
                return <span className="badge bg-warning">Pending</span>;

            case 'In Progress':
                return <span className="badge bg-primary">In Progress</span>;

            case 'Completed':
                return <span className="badge bg-success">Completed</span>;

            case 'Cancelled':
                return <span className="badge bg-danger">Cancelled</span>;

            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                    <h1 className="h3 mb-1">Garment Orders</h1>
                    <p className="text-muted mb-0">
                        Manage all garment orders
                    </p>
                </div>

                <div className="d-flex align-items-center gap-2 mb-3">
                    <Link to="/orders/create" className="btn btn-primary">
                        <i className="align-middle" data-feather="plus"></i>
                        Add Order
                    </Link>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    <h5 className="card-title mb-0">Order List</h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover table-bordered align-middle">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order No</th>
                                    <th>PO No</th>
                                    <th>Buyer</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total Value</th>
                                    <th>Status</th>
                                    <th className="text-center" >Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={order.id}>

                                            <td>{index + 1}</td>

                                            <td>
                                                <strong>{order.order_number}</strong>
                                            </td>

                                            <td>{order.po_number || '-'}</td>

                                            <td>{order.buyer_name}</td>

                                            <td>{order.product_name}</td>

                                            <td>
                                                {Number(order.order_qty).toLocaleString()}
                                            </td>

                                            <td>
                                                ${Number(order.unit_price).toLocaleString(
                                                    'en-US',
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }
                                                )}
                                            </td>

                                            <td>
                                                {/* <strong>
                                                    ${Number(order.total_value).toLocaleString(
                                                        'en-US',
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }
                                                    )}
                                                </strong> */}
                                            </td>

                                            {/* <td>{getStatusBadge(order.status)}</td> */}

                                            <td>
                                                <Link
                                                    to={`/orders/details/${order.id}`}
                                                    className="btn btn-sm btn-info me-1"
                                                    title="View"
                                                >
                                                    <i data-feather="eye"></i>
                                                </Link>

                                                <Link
                                                    to={`/orders/edit/${order.id}`}
                                                    className="btn btn-sm btn-warning me-1"
                                                    title="Edit"
                                                >
                                                    <i data-feather="edit-2"></i>
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Are you sure you want to delete this order?'
                                                            )
                                                        ) {
                                                            // Add delete functionality here
                                                        }
                                                    }}
                                                >
                                                    <i data-feather="trash-2"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={11} className="text-center py-5">

                                            <div className="text-muted">
                                                No garment orders found.
                                            </div>

                                            <Link
                                                to="/orders/create"
                                                className="btn btn-primary mt-3"
                                            >
                                                Add First Order
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
