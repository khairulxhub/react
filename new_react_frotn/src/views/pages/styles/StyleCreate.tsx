import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StyleCreate() {
    const navigate = useNavigate();

    const [buyers, setBuyers] = useState([]);
    const [formData, setFormData] = useState({
        style_name: '',
        style_no: '',
        buyer_id: '',
        season: '',
        status: 'active',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await axios.get('/api/buyers');
                const data = response.data;

                setBuyers(data.data ?? data.buyers ?? data);
            } catch (error) {
                console.error('Failed to fetch buyers:', error);
            }
        };

        fetchBuyers();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     setLoading(true);
    //     setErrors({});

    //     try {
    //         await axios.post('/api/styles', formData);

    //         navigate('/styles/manage');
    //     } catch (error) {
    //         if (error.response?.status === 422) {
    //             setErrors(error.response.data.errors || {});
    //         } else {
    //             console.error('Failed to create style:', error);
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1 fw-bold">Add Style</h2>
                    <p className="text-muted mb-0">
                        Create a new garment style
                    </p>
                </div>

                <Link
                    to="/styles/manage"
                    className="btn btn-light border"
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Styles
                </Link>
            </div>

            {/* Form Card */}
            <div className="card shadow-sm border-0">

                <div className="card-header bg-white py-3">
                    <h5 className="mb-0 fw-bold">
                        Style Information
                    </h5>
                </div>

                <div className="card-body">

                    <form >

                        <div className="row g-3">

                            {/* Style Name */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Style Name <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="style_name"
                                    // className={`form-control ${errors.style_name ? 'is-invalid' : ''}`}
                                    // value={formData.style_name}
                                    // onChange={handleChange}
                                    placeholder="Enter style name"
                                    required
                                />

                                {/* {errors.style_name && (
                                    <div className="invalid-feedback">
                                        {errors.style_name[0]}
                                    </div> */}
                                {/* )} */}

                            </div>

                            {/* Style No */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Style No <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="style_no"
                                    // className={`form-control ${errors.style_no ? 'is-invalid' : ''}`}
                                    value={formData.style_no}
                                    onChange={handleChange}
                                    placeholder="Example: ST-001"
                                    required
                                />

                                {/* {errors.style_no && (
                                    <div className="invalid-feedback">
                                        {errors.style_no[0]}
                                    </div>
                                )} */}

                            </div>

                            {/* Buyer */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Buyer
                                </label>

                                <select
                                    name="buyer_id"
                                    // className={`form-select ${errors.buyer_id ? 'is-invalid' : ''}`}
                                    value={formData.buyer_id}
                                    onChange={handleChange}
                                >
                                    {/* <option value="">Select Buyer</option>

                                    {buyers.map((buyer) => (
                                        <option key={buyer.id} value={buyer.id}>
                                            {buyer.name}
                                        </option>
                                    ))} */}
                                </select>

                                {/* {errors.buyer_id && (
                                    <div className="invalid-feedback">
                                        {errors.buyer_id[0]}
                                    </div>
                                )} */}

                            </div>

                            {/* Season */}
                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Season
                                </label>

                                <input
                                    type="text"
                                    name="season"
                                    // className={`form-control ${errors.season ? 'is-invalid' : ''}`}
                                    value={formData.season}
                                    onChange={handleChange}
                                    placeholder="Example: 2026"
                                />

                                {/* {errors.season && (
                                    <div className="invalid-feedback">
                                        {errors.season[0]}
                                    </div> */}
                                {/* )} */}

                            </div>

                            {/* Status */}
                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    // className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {/* {errors.status && (
                                    <div className="invalid-feedback">
                                        {errors.status[0]}
                                    </div> */}
                                {/* )} */}

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <Link
                                to="/styles/manage"
                                className="btn btn-light border"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                <i className="bi bi-check-lg"></i>
                                {loading ? 'Saving...' : 'Save Style'}
                            </button>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    );
}