import { useEffect, useState } from "react";
import {
  fetchUserProfileById,
  updateUserProfile,
} from "../services/api";
import Loading from "../components/ui/Loading";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { getUserId } from "../utils/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const userId = getUserId();

  // ========================
  // LOAD PROFILE
  // ========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!userId) throw new Error("User not logged in");

        const data = await fetchUserProfileById(userId);
        setUser(data);

        setForm({
          name: data.name || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  // ========================
  // HANDLERS
  // ========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUserProfile(userId, form, imageFile);
      setUser(updated);
      setEditMode(false);
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ========================
  // STATES
  // ========================
  if (loading) return <Loading manualLoading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        {error}
      </div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ========================
  // UI
  // ========================
  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-white border-l-4 border-primary pl-4">My Profile</h1>

        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-primary to-orange-600 p-8 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="flex items-center gap-6 relative z-10">
              {/* IMAGE */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-inner">
                {previewUrl || user.hasProfileImage ? (
                  <img
                    src={
                      previewUrl ||
                      `http://localhost:8080${user.profileImageUrl}`
                    }
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {user.name?.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-white/80 font-medium">
                  Member since {memberSince}
                </p>
              </div>
            </div>

            {!editMode ? (
              <Button
                variant="secondary"
                onClick={() => setEditMode(true)}
                className="relative z-10 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 relative z-10">
                <Button variant="ghost" onClick={() => setEditMode(false)} className="text-white hover:bg-white/20 hover:text-white">
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={saving} className="bg-white text-primary hover:bg-orange-50 font-bold border-none shadow-lg">
                  Save
                </Button>
              </div>
            )}
          </div>

          {/* BODY */}
          <div className="p-8 space-y-6">
            {/* IMAGE UPLOAD */}
            {editMode && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <label className="block text-sm font-medium text-slate-300 mb-2">Update Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-orange-600 transition-all cursor-pointer" />
              </div>
            )}

            {/* NAME */}
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:bg-white/5"
              labelClassName="text-slate-300"
            />

            {/* EMAIL (READ ONLY) */}
            <Input
              label="Email"
              value={user.email}
              disabled
              className="text-slate-400 border-white/5 bg-black/20"
              labelClassName="text-slate-300"
            />

            {/* PHONE */}
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:bg-white/5"
              labelClassName="text-slate-300"
            />

            {/* ADDRESS */}
            <Input
              label="Address"
              name="address"
              multiline
              rows={3}
              value={form.address}
              onChange={handleChange}
              disabled={!editMode}
              className="text-white placeholder-slate-500 border-white/10 focus:border-primary bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:bg-white/5"
              labelClassName="text-slate-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
