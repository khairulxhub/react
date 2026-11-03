import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StyleManage() {
    const [styles, setStyles] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchStyles = async () => {
        try {
            setLoading(true);

            const response = await axios.get('/api/styles', {
                params: {
                    search,
                    status,
                    page,
                },
            });

            const data = response.data;

            setStyles(data.data ?? data.styles ?? []);
            setTotal(data.total ?? data.meta?.total ?? 0);
            setLastPage(data.last_page ?? data.meta?.last_page ?? 1);
        } catch (error) {
            console.error('Failed to fetch styles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStyles();
    }, [search, status, page]);

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setPage(1);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this style?')) {
            return;
        }

        try {
            await axios.delete(`/api/styles/${id}`);
            fetchStyles();
        } catch (error) {
            console.error('Failed to delete style:', error);
        }
    };

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1 fw-bold">Styles</h2>
                    <p className="text-muted mb-0">Manage all garment styles</p>
                </div>

                <Link to="/styles/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg"></i> Add Style
                </Link>
            </div>

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setPage(1);
                        fetchStyles();
                    }}>
                        <div className="row g-3 align-items-end">

                            <div className="col-md-5">
                                <label className="form-label fw-semibold">Search Style</label>
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="Search style name or style no..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="bi bi-search"></i> Search
                                </button>
                            </div>

                            <div className="col-md-2">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="btn btn-light border w-100"
                                >
                                    <i className="bi bi-arrow-clockwise"></i> Reset
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm border-0">

                <div className="card-header bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold">Style List</h5>
                        <span className="text-muted">
                            Total: <strong>{total}</strong>
                        </span>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">#</th>
                                    <th>Style Name</th>
                                    <th>Style No</th>
                                    <th>Buyer</th>
                                    <th>Season</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-5">
                                            Loading styles...
                                        </td>
                                    </tr>
                                ) : styles.length > 0 ? (
                                    styles.map((style, key) => (
                                        <tr key={''}>
                                            <td className="ps-4">
                                                {(page - 1) * 10 + key + 1}
                                            </td>

                                            <td>
                                                <div className="fw-semibold">
                                                    {''}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    {'style.style_no'}
                                                </span>
                                            </td>

                                            {/* <td>{style.buyer?.name || '-'}</td>
                                            <td>{style.season || '-'}</td> */}

                                            {/* <td>
                                                {style.status === 'active' ? (
                                                    <span className="badge bg-success-subtle text-success">
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-danger-subtle text-danger">
                                                        <i className="bi bi-x-circle me-1"></i>
                                                        Inactive
                                                    </span>
                                                )}
                                            </td> */}

                                            <td>
                                                <div className="d-flex justify-content-center gap-1">

                                                    <Link
                                                        to={``}
                                                        className="btn btn-sm btn-light border"
                                                        title="View"
                                                    >
                                                        <i data-feather="eye"></i>
                                                    </Link>

                                                    <Link
                                                        to={``}
                                                        className="btn btn-sm btn-light border"
                                                        title="Edit"
                                                    >
                                                        <i data-feather="edit-2"></i>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        // onClick={() => handleDelete()}
                                                        className="btn btn-sm btn-light border text-danger"
                                                        title="Delete"
                                                    >
                                                        <i data-feather="trash-2"></i>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-5">
                                            <div className="text-muted">
                                                <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                                                <h6>No styles found</h6>
                                                <p className="mb-0">
                                                    There are no garment styles available.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {lastPage > 1 && (
                    <div className="card-footer bg-white border-0">
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                className="btn btn-light border"
                                disabled={page <= 1 || loading}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                            <span className="align-self-center">
                                Page {page} of {lastPage}
                            </span>

                            <button
                                className="btn btn-light border"
                                disabled={page >= lastPage || loading}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}