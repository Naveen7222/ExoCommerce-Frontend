// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const token = getToken();
  const role = getRole();
  const isAuthenticated = !!token;
  const isAdmin = role === "ADMIN";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              ExoCommerce
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>

            {/* ADMIN LINKS */}
            {isAdmin && (
              <Link
                to="/admin/products"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Manage Products
              </Link>
            )}
          </div>

          {/* Auth Area */}
          <div className="flex items-center space-x-4">

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-violet-600 font-semibold hover:text-violet-700"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
