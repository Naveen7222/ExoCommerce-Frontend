// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { registerAuthUser, createUserProfile } from "../services/api";
import Toast from "../components/ui/Toast";

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
      const { authUserId } = await registerAuthUser({ email, password });

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
      setTimeout(() => navigate("/login"), 2000);
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
            Create an Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* IMAGE */}
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <div className="w-28 h-28 rounded-full overflow-hidden border flex items-center justify-center bg-gray-50">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload</span>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input label="Address" multiline rows={3} value={address} onChange={(e) => setAddress(e.target.value)} required />

            <Button type="submit" variant="gradient" className="w-full" loading={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
