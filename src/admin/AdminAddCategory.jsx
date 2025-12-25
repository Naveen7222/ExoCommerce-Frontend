import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import ChakraLoader from "../components/ui/ChakraLoader";
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
    return <ChakraLoader manualLoading={true} />;
  }

  return (
    <div className="max-w-xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Add New Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mobile, Laptop"
          required
        />

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            Add Category
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
