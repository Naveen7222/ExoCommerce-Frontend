import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import { fetchCategories, updateCategory, deleteCategory } from "../services/api";
import { useModal } from "../context/ModalContext";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const { showModal } = useModal();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName("");
    };

    const handleSaveEdit = async (id) => {
        if (!editName.trim()) {
            showModal({ title: "Invalid Name", message: "Category name cannot be empty", type: "warning" });
            return;
        }

        if (editName.length > 50) {
            showModal({ title: "Invalid Name", message: "Category name cannot exceed 50 characters", type: "warning" });
            return;
        }

        try {
            await updateCategory(id, { name: editName.trim() });
            setCategories(
                categories.map((cat) =>
                    cat.id === id ? { ...cat, name: editName.trim() } : cat
                )
            );
            setEditingId(null);
            setEditName("");
        } catch (err) {
            console.error(err);
            showModal({ title: "Update Failed", message: err.response?.data || "Failed to update category", type: "error" });
        }
    };

    const handleDelete = (id) => {
        showModal({
            title: "Delete Category",
            message: "Are you sure you want to delete this category? This action cannot be undone.",
            type: "confirm",
            onConfirm: async () => {
                try {
                    await deleteCategory(id);
                    setCategories((prev) => prev.filter((cat) => cat.id !== id));
                    showModal({ title: "Success", message: "Category deleted successfully", type: "success" });
                } catch (err) {
                    console.error(err);
                    showModal({ title: "Delete Failed", message: err.response?.data || "Failed to delete category", type: "error" });
                }
            }
        });
    };

    if (loading) {
        return <Loading manualLoading={true} />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Manage Categories
                    </h1>
                    <p className="text-slate-400 mt-1">
                        View, edit, and delete product categories
                    </p>
                </div>
                <Link to="/admin/categories/add">
                    <Button className="shadow-lg shadow-primary/20">Add New Category</Button>
                </Link>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {categories.length === 0 ? (
                <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl shadow-lg border border-white/5 p-12 text-center">
                    <div className="text-slate-500 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No Categories Yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Get started by adding your first product category
                    </p>
                    <Link to="/admin/categories/add">
                        <Button>Add Your First Category</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl shadow-lg border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold opacity-80">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold opacity-80">
                                    Category Name
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold opacity-80">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-white/5 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === category.id ? (
                                            <>
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value.length <= 50) {
                                                            setEditName(value);
                                                        }
                                                    }}
                                                    maxLength={50}
                                                    className="max-w-md"
                                                    autoFocus
                                                />
                                                <p className="text-xs text-slate-400 mt-1">{editName.length}/50 characters</p>
                                            </>
                                        ) : (
                                            <span className="text-white font-bold text-lg">
                                                {category.name}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {editingId === category.id ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleSaveEdit(category.id)}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(category.id)}
                                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </div>
    );
}
