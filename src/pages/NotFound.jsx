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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-lg text-center animate-fade-in">
        
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <Link
          to={redirectPath}
          className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
