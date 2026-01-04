import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import { Button } from "../components/ui/Button";

import Input from "../components/ui/Input";
import { fetchCategories } from "../services/api";
import { useModal } from "../context/ModalContext";

export default function AddProduct() {
    const { showModal } = useModal();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: 50,
        category: "",
    });
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    React.useEffect(() => {
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
                showModal({
                    title: "File Too Large",
                    message: "File size exceeds 2MB limit. Please choose a smaller image.",
                    type: "warning"
                });
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



            const productData = {
                name: formData.name,
                description: formData.description,
                price: price,
                stock: Number(formData.stock),
                categoryId: Number(formData.category),
            };

            const data = new FormData();
            data.append("dto", new Blob([JSON.stringify(productData)], { type: "application/json" }));
            if (imageFile) {
                data.append("image", imageFile);
            }

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
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Add New Product</h1>

            <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/5">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 text-red-200 rounded-lg border border-red-500/20">
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
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="50"
                            required
                        />

                        <div className="flex flex-col mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition duration-200 outline-none appearance-none hover:bg-white/10"
                                    required
                                >
                                    <option value="" disabled className="bg-slate-800 text-slate-400">Select a category</option>
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
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Product Image
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-400
                                file:mr-4 file:py-2.5 file:px-6
                                file:rounded-full file:border-0
                                file:text-sm file:font-bold
                                file:bg-primary file:text-white
                                hover:file:bg-primary-hover
                                file:transition-colors
                                cursor-pointer
                                bg-white/5 rounded-xl border border-white/10
                                "
                            />
                        </div>
                    </div>

                    {previewUrl && (
                        <div className="mt-4">
                            <p className="text-sm text-slate-400 mb-2">Preview:</p>
                            <div className="w-full h-48 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full py-4 text-lg shadow-xl shadow-primary/25"
                            disabled={loading}
                            variant="primary" // Changed from gradient to primary for consistency
                        >
                            {loading ? "Adding Product..." : "Add Product"}
                        </Button>
                    </div>
                </form>
            </div >
        </div >
    );
}
