import { Link } from "react-router";


function NotFound() {
    return (
       <>
       
  <main className="error-page">
    <section className="error-card">
      <a className="auth-brand justify-content-center" href="index.html">
        <span className="brand-icon">
            <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i></span><span><strong>adminHMD</strong><small>Error Center</small></span></a>
      <img className="error-illustration" src="assets/image/404.svg" alt="Page not found illustration"/>
      <div className="error-code">404</div>
      <h1 className="h3 mb-2">Page Not Found</h1>
      <p className="text-muted mb-4">The page you are looking for does not exist or has been moved.</p>
      <div className="d-flex flex-wrap justify-content-center gap-2"><a className="btn btn-primary" href="index.html"><i className="bi bi-speedometer2" aria-hidden="true">
        </i> Back to Dashboard</a>
        <Link className="btn btn-outline-secondary" to="/login">Sign In</Link>
        </div>
    </section>
  </main>
       
       
       </>
    );
}

export default NotFound