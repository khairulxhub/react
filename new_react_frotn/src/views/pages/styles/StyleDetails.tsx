
import React, { useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function TechPackUpload() {
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [imageError, setImageError] = useState("");
    const [pdfError, setPdfError] = useState("");
    const [loading, setLoading] = useState(false);

    const imageInput = useRef(null);
    const pdfInput = useRef(null);
    const formRef = useRef(null);

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!image) {
            setImageUrl("");
            return;
        }

        const url = URL.createObjectURL(image);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [image]);

    function handleImageChange(event: any) {
        const file = event.target.files?.[0];

        setImage(null);
        setImageError("");

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setImageError(
                "Please select a JPG, JPEG, PNG or WEBP image."
            );
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setImageError(
                "Image is too large. Maximum allowed size is 20MB."
            );
            event.target.value = "";
            return;
        }

        setImage(file);
    }

    function handlePdfChange(event: any) {
        const file = event.target.files?.[0];

        setPdf(null);
        setPdfError("");

        if (!file) return;

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            setPdfError("Please select a valid PDF file.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setPdfError(
                "PDF is too large. Maximum allowed size is 20MB."
            );
            event.target.value = "";
            return;
        }

        setPdf(file);
    }

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(2)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    // function handleSubmit(event: any) {
    //     const imageFile = imageInput.current?.files?.[0];
    //     const pdfFile = pdfInput.current?.files?.[0];

    //     if (
    //         (imageFile && imageFile.size > MAX_FILE_SIZE) ||
    //         (pdfFile && pdfFile.size > MAX_FILE_SIZE)
    //     ) {
    //         event.preventDefault();

    //         if (imageFile && imageFile.size > MAX_FILE_SIZE) {
    //             setImageError(
    //                 "Image is too large. Maximum allowed size is 20MB."
    //             );
    //         }

    //         if (pdfFile && pdfFile.size > MAX_FILE_SIZE) {
    //             setPdfError(
    //                 "PDF is too large. Maximum allowed size is 20MB."
    //             );
    //         }

    //         return;
    //     }

    //     setLoading(true);
    // }

    // function handleReset() {
    //     setImage(null);
    //     setPdf(null);
    //     setImageError("");
    //     setPdfError("");
    //     setLoading(false);

    //     if (imageInput.current) {
    //         imageInput.current.value = "";
    //     }

    //     if (pdfInput.current) {
    //         pdfInput.current.value = "";
    //     }
    // }

    return (
        <form
            ref={formRef}
            // onSubmit={handleSubmit}
            // onReset={handleReset}
            method="POST"
            encType="multipart/form-data"
        >
            {/* Laravel CSRF token and style_id must be
                provided by your Blade template. */}

            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">
                        Tech Pack Image
                    </label>

                    <input
                        ref={imageInput}
                        type="file"
                        name="image"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        className={`form-control ${imageError ? "is-invalid" : ""}`}
                        onChange={handleImageChange}
                    />

                    <small className="text-muted">
                        JPG, JPEG, PNG, WEBP — Maximum 20MB
                    </small>

                    {imageError && (
                        <div className="text-danger small mt-1">
                            {imageError}
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <label className="form-label">
                        Tech Pack PDF
                    </label>

                    <input
                        ref={pdfInput}
                        type="file"
                        name="pdf"
                        accept=".pdf,application/pdf"
                        className={`form-control ${pdfError ? "is-invalid" : ""}`}
                        onChange={handlePdfChange}
                    />

                    <small className="text-muted">
                        PDF only — Maximum 20MB
                    </small>

                    {pdfError && (
                        <div className="text-danger small mt-1">
                            {pdfError}
                        </div>
                    )}
                </div>

                {imageUrl && (
                    <div className="col-md-6">
                        <label className="form-label">
                            Image Preview
                        </label>

                        <div className="border rounded p-2 bg-white">
                            <img
                                src={imageUrl}
                                alt="Tech Pack preview"
                                className="img-fluid rounded"
                                style={{
                                    maxHeight: 250,
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </div>
                )}

                {pdf && (
                    <div className="col-md-6">
                        <label className="form-label">
                            Selected PDF
                        </label>

                        <div className="border rounded p-3 bg-white">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-file-earmark-pdf text-danger fs-2 me-2" />

                                <div>
                                    <div className="fw-semibold">
                                        {/* {pdf.name} */}
                                    </div>

                                    <small className="text-muted">
                                        {/* {formatFileSize(pdf.size)} */}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-12">
                    <hr />

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="reset"
                            className="btn btn-light border"
                        >
                            <i className="bi bi-arrow-counterclockwise me-1" />
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-1" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-save me-1" />
                                    Save Tech Pack
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
