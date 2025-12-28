import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, logout } from "../utils/auth";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";
import { Button } from "./ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { cartCount } = useCart();

  /* ========================
     AUTH STATE (MEMOIZED)
  ======================== */
  const { isAuthenticated, isAdmin } = useMemo(() => {
    const token = getToken();
    const role = getRole();
    return {
      isAuthenticated: !!token,
      isAdmin: role === "ADMIN",
    };
  }, []);

  /* ========================
     LOGOUT
  ======================== */
  const handleLogout = () => {
    showModal({
      title: "Logout",
      message: "Are you sure you want to log out?",
      type: "confirm",
      onConfirm: () => {
        logout();
        setIsMenuOpen(false);
        navigate("/login");
      },
    });
  };

  return (
    <nav className="bg-white/80 shadow-sm border-b border-white/20 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="ExoCommerce Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-secondary font-medium hover:text-primary">
              Home
            </Link>

            {isAdmin && (
              <>
                <Link to="/admin/products" className="text-secondary font-medium hover:text-primary">
                  Manage Products
                </Link>
                <Link to="/admin/categories" className="text-secondary font-medium hover:text-primary">
                  Manage Categories
                </Link>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* CART — USERS ONLY */}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block">
            Home
          </Link>

          {isAdmin && (
            <>
              <Link to="/admin/products" onClick={() => setIsMenuOpen(false)}>
                Manage Products
              </Link>
              <Link to="/admin/categories" onClick={() => setIsMenuOpen(false)}>
                Manage Categories
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="secondary" size="sm" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
