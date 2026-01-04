import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginUser } from "../services/api";
import { setToken, getRole, setUserId, getUserId } from "../utils/auth";
import { useToast } from "../components/ui/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (!response?.token) {
        throw new Error("Token not received");
      }

      setToken(response.token);

      // Extract and store userId from token
      const userId = getUserId();
      if (userId) {
        setUserId(userId);
      }

      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event("authChange"));

      addToast("Login successful! Redirecting...", "success");

      const role = getRole();
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1200);
    } catch (error) {
      console.error("Login failed:", error);
      addToast("Invalid email or password. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary opacity-10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 opacity-5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/5">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl mb-6 shadow-lg shadow-orange-500/20 transform -rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-3">
              Sign in to continue to ExoCommerce
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/25"
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-bold text-primary hover:text-orange-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
