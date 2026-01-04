import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-20 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary opacity-5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={logo} alt="ExoCommerce" className="h-16 w-auto object-contain drop-shadow-md brightness-110" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for premium products. Experience the
              future of shopping with our curated collection and seamless checkout.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Icons */}
              {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  Discounts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay in the loop</h3>
            <p className="text-slate-400 text-sm mb-6">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm shadow-lg shadow-primary/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {currentYear} ExoCommerce. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
