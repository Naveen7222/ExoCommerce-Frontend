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

    // Validate inputs before submission
    if (!form.name.trim()) {
      showModal({ title: "Error", message: "Product name is required", type: "error" });
      return;
    }

    if (form.name.length > 100) {
      showModal({ title: "Error", message: "Product name cannot exceed 100 characters", type: "error" });
      return;
    }

    if (form.description.length > 500) {
      showModal({ title: "Error", message: "Description cannot exceed 500 characters", type: "error" });
      return;
    }

    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      showModal({ title: "Error", message: "Price must be a valid positive number", type: "error" });
      return;
    }

    const stock = parseInt(form.stock);
    if (isNaN(stock) || stock < 0) {
      showModal({ title: "Error", message: "Stock must be a valid positive number", type: "error" });
      return;
    }

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-white">Edit Product</h1>

      <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Product Name"
            value={form.name}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 100) {
                showModal({
                  title: "Input Too Long",
                  message: "Product name cannot exceed 100 characters.",
                  type: "warning"
                });
                return;
              }
              setForm({ ...form, name: value });
            }}
            maxLength={100}
            required
          />
          <p className="text-xs text-slate-400 mt-1">{form.name.length}/100 characters</p>

          <Input
            label="Description"
            value={form.description}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 500) {
                showModal({
                  title: "Input Too Long",
                  message: "Description cannot exceed 500 characters.",
                  type: "warning"
                });
                return;
              }
              setForm({ ...form, description: value });
            }}
            maxLength={500}
            required
            multiline
            rows={3}
          />
          <p className="text-xs text-slate-400 mt-1">{form.description.length}/500 characters</p>

          {/* CATEGORY */}
          <div>
            <label className="block font-medium mb-2 text-slate-300">
              Category
            </label>

            <div className="relative">
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition duration-200 outline-none appearance-none hover:bg-white/10"
                required
              >
                <option value="" className="bg-slate-800 text-slate-400">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => {
                const value = e.target.value;
                if (parseFloat(value) < 0) return;
                setForm({ ...form, price: value });
              }}
              required
            />

            <Input
              label="Stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value) < 0) return;
                setForm({ ...form, stock: value });
              }}
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block font-medium mb-2 text-slate-300">
              Product Image (optional)
            </label>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-40 h-28 object-cover mb-4 border border-white/10 rounded-lg shadow-md"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 2 * 1024 * 1024) { // 2MB limit
                    showModal({
                      title: "File Too Large",
                      message: "File size exceeds 2MB limit. Please choose a smaller image.",
                      type: "warning"
                    });
                    e.target.value = null;
                    return;
                  }
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2.5 file:px-6
                  file:rounded-full file:border-0
                  file:text-sm file:font-bold
                  file:bg-primary file:text-white
                  hover:file:bg-primary-hover
                  file:transition-colors
                  cursor-pointer
                  bg-white/5 rounded-xl border border-white/10"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={saving} className="flex-1 shadow-lg shadow-primary/25">
              {saving ? "Saving..." : "Update Product"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
