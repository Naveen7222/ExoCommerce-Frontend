import { Link } from "react-router-dom";
import { getRole, getToken } from "../utils/auth";

export default function NotFound() {
  const token = getToken();
  const role = getRole();

  const isAuthenticated = !!token;
  const isAdmin = role === "ADMIN";

  const redirectPath = isAuthenticated
    ? isAdmin
      ? "/admin"
      : "/"
    : "/";

  const buttonText = isAuthenticated && isAdmin
    ? "Go to Dashboard"
    : "Go to Home";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary opacity-10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 opacity-5 rounded-full blur-[120px]"></div>
      </div>

      <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-lg text-center animate-fade-in border border-white/5 relative z-10">

        {/* Big 404 */}
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 mb-6 drop-shadow-lg">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mb-10 text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <Link
          to={redirectPath}
          className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
