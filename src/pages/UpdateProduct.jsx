import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  fetchCategories,
  getProductById,
  updateProduct,
} from "../services/api";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= LOAD PRODUCT + CATEGORIES ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const [product, cats] = await Promise.all([
          getProductById(id),
          fetchCategories(),
        ]);

        setCategories(cats);

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.categoryId,
        });

        if (product.imageBase64) {
          setPreviewUrl(`data:image/jpeg;base64,${product.imageBase64}`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load product data");
      }
    };

    loadData();
  }, [id]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.category),
      };

      const form = new FormData();
      form.append(
        "dto",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
      );

      if (imageFile) {
        form.append("image", imageFile);
      }

      await updateProduct(id, form);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-neutral-800">
        Update Product
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-100">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Product Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {previewUrl && (
            <div className="h-48 rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3 text-lg"
            disabled={loading}
            variant="gradient"
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
