import { useState } from "react";
import { createCategory } from "../services/api";

export default function AdminAddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      await createCategory({ name: name.trim() });
      setSuccess("Category added successfully");
      setName("");
    } catch (err) {
      setError(
        err?.response?.data || "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Add Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
