import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchCategories,
  deleteProduct,
} from "../services/api";

import { Button } from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import { useModal } from "../context/ModalContext";

export default function AdminProducts() {
  const { showModal } = useModal();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(selectedCategory);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

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


  const handleDelete = (id) => {
    showModal({
      title: "Delete Product",
      message: "Are you sure you want to delete this product? This action cannot be undone.",
      type: "confirm",
      onConfirm: async () => {
        try {
          await deleteProduct(id);
          setProducts((prev) => prev.filter((p) => p.id !== id));
          showModal({ title: "Deleted", message: "Product has been deleted.", type: "success" });
        } catch (err) {
          console.error(err);
          showModal({ title: "Error", message: "Failed to delete product.", type: "error" });
        }
      }
    });
  };

  if (loading) {
    return <Loading manualLoading={true} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Manage Products
        </h1>

        <div className="flex gap-3 mb-6 flex-wrap">
          <Button
            size="sm"
            variant={!selectedCategory ? "primary" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={!selectedCategory ? "" : "border-white/10 text-slate-300 hover:text-white hover:bg-white/10"}
          >
            All
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={selectedCategory === cat.id ? "primary" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? "" : "border-white/10 text-slate-300 hover:text-white hover:bg-white/10"}
            >
              {cat.name}
            </Button>
          ))}
        </div>


        <Link to="/admin/products/add">
          <Button className="shadow-lg shadow-primary/20">Add Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-[#1E293B]/70 backdrop-blur-md rounded-xl shadow-2xl border border-white/5">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {products.map((product) => {
              const imageSrc = product.imageBase64
                ? `data:image/jpeg;base64,${product.imageBase64}`
                : "https://placehold.co/100x80?text=No+Image";

              return (
                <tr
                  key={product.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-16 h-12 object-cover rounded-lg border border-white/10"
                    />
                  </td>

                  <td className="p-4 font-bold text-white">
                    {product.name}
                  </td>

                  <td className="p-4 text-slate-400">
                    {product.categoryName || "—"}
                  </td>

                  <td className="p-4 text-primary font-bold">
                    ${product.price}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="danger"
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No products found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
