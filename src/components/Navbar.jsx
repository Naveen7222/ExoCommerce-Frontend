import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getRole, logout, getUserId } from "../utils/auth";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";
import { fetchUserProfileById } from "../services/api";
import logo from "../assets/logo.png";
import { Button } from "./ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const { showModal } = useModal();
  const { cartCount } = useCart();
  const profileRef = useRef(null);

  /* ========================
     CHECK AUTH STATE
  ======================== */
  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const role = getRole();
      const id = getUserId();

      setIsAuthenticated(!!token);
      setIsAdmin(role === "ADMIN");
      setUserId(id);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  /* ========================
     FETCH USER PROFILE (FOR NAME + IMAGE)
  ======================== */
  useEffect(() => {
    const loadUser = async () => {
      if (!isAuthenticated || !userId) return;

      try {
        const data = await fetchUserProfileById(userId);
        setUser(data);
        setImageError(false);
      } catch (err) {
        setUser(null);
      }
    };

    loadUser();
  }, [isAuthenticated, isAdmin, userId]);

  /* ========================
     CLOSE DROPDOWN ON OUTSIDE CLICK
  ======================== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

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

        // ✅ CLEAR USER-SPECIFIC STATE
        setUser(null);
        setImageError(false);

        window.dispatchEvent(new Event("authChange"));

        setIsMenuOpen(false);
        setIsProfileOpen(false);
        navigate("/login");
      },
    });
  };
  useEffect(() => {
    const loadUser = async () => {
      if (!isAuthenticated || isAdmin || !userId) {
        setUser(null);
        setImageError(false);
        return;
      }

      try {
        setUser(null);          // 👈 add
        setImageError(false);   // 👈 add

        const data = await fetchUserProfileById(userId);
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, [isAuthenticated, isAdmin, userId]);


  // Helper component for Nav Links
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative text-slate-300 font-medium hover:text-white transition-colors duration-300 group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300">
      {/* Centered Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <img src={logo} alt="ExoCommerce" className="h-10 w-auto md:h-12 drop-shadow-sm" />
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>

            {isAuthenticated && !isAdmin && (
              <NavLink to="/orders/my">My Orders</NavLink>
            )}

            {isAdmin && (
              <>
                <NavLink to="/admin">Dashboard</NavLink>
                <NavLink to="/admin/products">Manage Products</NavLink>
                <NavLink to="/admin/categories">Manage Categories</NavLink>
              </>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-3 md:space-x-5">

            {/* CART - Only for Customers */}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
              >
                {/* SVG Cart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>

                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-2 ring-[#0F172A] transform scale-100 animate-fade-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* AUTH Buttons / Profile */}
            <div className="hidden md:flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full font-semibold hover:bg-white/10 text-slate-300 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="primary"
                      className="rounded-full px-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 font-bold border-none"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors border-2 border-transparent hover:border-white/10"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-[#0F172A]">
                      {user?.hasProfileImage && !imageError ? (
                        <img
                          src={`http://localhost:8080${user.profileImageUrl}?uid=${user.id}&t=${user.updatedAt}`}
                          onError={() => setImageError(true)}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 overflow-hidden animate-fade-in origin-top-right text-slate-200">
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <p className="text-sm text-slate-400">Signed in as</p>
                        <p className="font-bold text-white truncate">{user?.email || "User"}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE - Styled */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU (Simple Expand) */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in bg-[#0F172A]/95 rounded-b-2xl">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 hover:bg-white/5 text-slate-300 font-medium rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {isAuthenticated && !isAdmin && (
                <Link to="/orders/my" className="px-4 py-2 hover:bg-white/5 text-slate-300 font-medium rounded-lg" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              )}
              {isAdmin && (
                <>
                  <Link to="/admin" className="px-4 py-2 hover:bg-white/5 text-slate-300 font-medium rounded-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/admin/products" className="px-4 py-2 hover:bg-white/5 text-slate-300 font-medium rounded-lg" onClick={() => setIsMenuOpen(false)}>Manage Products</Link>
                  <Link to="/admin/categories" className="px-4 py-2 hover:bg-white/5 text-slate-300 font-medium rounded-lg" onClick={() => setIsMenuOpen(false)}>Manage Categories</Link>
                </>
              )}

              {!isAuthenticated && (
                <div className="flex flex-col gap-2 px-4 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 rounded-full border border-white/20 text-slate-300 font-bold hover:bg-white/10">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 rounded-full bg-primary text-white font-bold shadow-md hover:bg-primary-hover">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

