import { useNavigate } from "react-router";

export default function AccessDenied() {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Lock Icon - Pure SVG */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10V7a4 4 0 118 0v3"
            />
            <path
              strokeLinecap="round"
              d="M12 14v3"
            />
          </svg>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600">
          Error 403
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Access Denied
        </h1>

        <p className="mt-5 text-base leading-7 text-gray-500">
          Sorry, you don't have permission to access this page.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            ← Go Back
          </button>

          <button
            onClick={() => {navigate('/login');}}
            className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Login →
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          If you need access, please request permission.
        </p>
      </div>
    </div>
  );
}