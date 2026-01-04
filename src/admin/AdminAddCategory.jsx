import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import { addCategory } from "../services/api";

export default function AdminAddCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addCategory({ name: name.trim() });
      navigate("/admin/categories"); // or wherever you list categories
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        setError("Category already exists");
      } else {
        setError("Failed to create category");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading manualLoading={true} />;
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Add New Category
      </h1>

      <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mobile, Laptop"
            required
          />

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} className="flex-1 shadow-lg shadow-primary/25">
              Add Category
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
