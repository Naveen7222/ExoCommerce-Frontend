import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, logout } from "../utils/auth";
import logo from "../assets/logo.png";
import { Button } from "./ui/Button";

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
    <nav className="bg-white/80 shadow-sm border-b border-white/20 sticky top-0 z-50 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="ExoCommerce Logo"
              className="h-22 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-secondary font-medium hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>

            {/* ADMIN LINKS */}
            {isAdmin && (
              <Link
                to="/admin/products"
                className="text-secondary font-medium hover:text-primary transition-colors duration-200"
              >
                Manage Products
              </Link>
            )}
          </div>

          {/* Auth Area */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="shadow-lg shadow-primary/20">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
