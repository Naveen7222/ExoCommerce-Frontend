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
                    <h1 className="text-3xl font-bold text-gray-800">
                        Manage Categories
                    </h1>
                    <p className="text-gray-600 mt-1">
                        View, edit, and delete product categories
                    </p>
                </div>
                <Link to="/admin/categories/add">
                    <Button>Add New Category</Button>
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {categories.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <div className="text-gray-400 mb-4">
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Categories Yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Get started by adding your first product category
                    </p>
                    <Link to="/admin/categories/add">
                        <Button>Add Your First Category</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Category Name
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === category.id ? (
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="max-w-md"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-gray-800 font-medium">
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
                                                    className="text-red-600 hover:bg-red-50 border-red-300"
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
