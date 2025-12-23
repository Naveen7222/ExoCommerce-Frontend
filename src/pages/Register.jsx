// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { registerAuthUser, createUserProfile } from "../services/api";
<<<<<<< HEAD
=======
import Toast from "../components/ui/Toast";
>>>>>>> fad8b66f55a33965144cebcb48491853d95121e4

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [profileImg, setProfileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: "", type: "success" });
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files are allowed", "error");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      showToast("Image must be smaller than 2MB", "error");
      return;
    }

    setProfileImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ AUTH REGISTER
      const { authUserId } = await registerAuthUser({
        email,
        password,
      });

      // 2️⃣ USER PROFILE
      const formData = new FormData();
      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              authUserId,
              email,
              phone,
              address,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (profileImg) {
        formData.append("image", profileImg);
      }

      await createUserProfile(formData);

      showToast("Account created successfully! Redirecting to login...", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      showToast("Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 py-10">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

<<<<<<< HEAD
        {error && (
          <div className="text-red-600 text-sm text-center mb-3">{error}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* IMAGE */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Upload</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
=======
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
              Create an Account
            </h1>
            <p className="text-gray-600 mt-2">Join ExoCommerce today</p>
>>>>>>> fad8b66f55a33965144cebcb48491853d95121e4
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* IMAGE UPLOAD */}
            <div className="flex justify-center mb-6">
              <label className="cursor-pointer group relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-violet-100 group-hover:border-violet-200 transition-colors shadow-inner bg-gray-50 flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs font-medium">Upload Photo</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-violet-600 text-white rounded-full p-2 shadow-lg group-hover:bg-violet-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              startIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              startIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              }
            />

            <Input
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              startIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            <Input
              label="Address"
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="gradient"
              className="w-full py-3 shadow-lg hover:shadow-xl transform transition-all active:scale-[0.98]"
              loading={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
