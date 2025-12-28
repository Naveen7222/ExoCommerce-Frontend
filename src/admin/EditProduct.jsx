import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";

import axios from "axios";
import { fetchCategories } from "../services/api";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

import { useModal } from "../context/ModalContext";

export default function EditProduct() {
  const { showModal } = useModal();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ============================
     LOAD CATEGORIES
  ============================ */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    loadCategories();
  }, []);

  /* ============================
     LOAD PRODUCT
  ============================ */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock ?? "",
          categoryId: data.categoryId ?? "",
        });

        if (data.imageBase64) {
          setPreview(`data:image/jpeg;base64,${data.imageBase64}`);
        }
      } catch (err) {
        console.error(err);
        console.error(err);
        showModal({ title: "Error", message: "Failed to load product details", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, showModal]);

  /* ============================
     SUBMIT UPDATE
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (image) {
        // multipart update
        const formData = new FormData();
        formData.append(
          "dto",
          new Blob([JSON.stringify(form)], {
            type: "application/json",
          })
        );
        formData.append("image", image);

        await api.put(`/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // json-only update
        await api.put(`/products/${id}`, form);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      console.error(err);
      showModal({ title: "Error", message: "Update failed. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading manualLoading={true} />;
  }

  return (
    <div className="max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <Input
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        {/* CATEGORY */}
        <div>
          <label className="block font-medium mb-1">
            Category
          </label>

          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <Input
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        {/* IMAGE */}
        <div>
          <label className="block font-medium mb-1">
            Product Image (optional)
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-28 object-cover mb-2 border rounded"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Product"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
