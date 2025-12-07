import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size exceeds 2MB limit. Please choose a smaller image.");
                e.target.value = null; // Reset input
                setImageFile(null);
                setPreviewUrl(null);
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate price
            const price = parseFloat(formData.price);
            if (isNaN(price)) {
                throw new Error("Price must be a valid number");
            }

            if (!imageFile) {
                throw new Error("Please select an image");
            }

            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", price);
            data.append("category", formData.category);
            data.append("image", imageFile);

            await addProduct(data);
            navigate("/");
        } catch (err) {
            setError("Failed to add product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-neutral-800">Add New Product</h1>

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
                        placeholder="e.g. Wireless Headphones"
                        required
                    />

                    <Input
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product details..."
                        multiline
                        rows={4}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Price ($)"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="99.99"
                            required
                        />

                        <Input
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Electronics"
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-violet-50 file:text-violet-700
                 hover:file:bg-violet-100
               "
                            required
                        />
                    </div>

                    {previewUrl && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Preview:</p>
                            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full py-3 text-lg"
                            disabled={loading}
                            variant="gradient"
                        >
                            {loading ? "Adding Product..." : "Add Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
