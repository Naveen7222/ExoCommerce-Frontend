import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { registerAuthUser, createUserProfile } from "../services/api";
import { useToast } from "../components/ui/Toast";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function Register() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [profileImg, setProfileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      addToast("Only image files are allowed", "error");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      addToast("Image must be smaller than 2MB", "error");
      return;
    }

    setProfileImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Register auth user
      const { authUserId } = await registerAuthUser({ email, password });

      // 2️⃣ Create user profile (multipart)
      const formData = new FormData();
      formData.append(
        "user",
        JSON.stringify({
          authUserId,
          name,
          email,
          phone,
          address,
        })
      );

      if (profileImg) {
        formData.append("image", profileImg);
      }

      await createUserProfile(formData);

      addToast(
        "Account created successfully! Redirecting to login...",
        "success"
      );

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      addToast("Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary opacity-10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 opacity-5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/5">
          <h1 className="text-3xl font-extrabold text-center mb-8 text-white">
            Create an Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* PROFILE IMAGE */}
            <div className="flex justify-center">
              <label className="cursor-pointer group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 flex items-center justify-center bg-white/5 group-hover:border-primary transition-colors">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm group-hover:text-primary transition-colors">Upload</span>
                  )}
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
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Input
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Input
              label="Address"
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors"
              labelClassName="text-slate-300"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/25"
              loading={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:text-orange-400 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
