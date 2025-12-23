import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../services/api";
import { Button } from "../components/ui/Button";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        Loading products...
      </div>
    );
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
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Products
        </h1>

        <Link to="/admin/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const imageSrc = product.imageBase64
                ? `data:image/jpeg;base64,${product.imageBase64}`
                : "https://placehold.co/100x80?text=No+Image";

              return (
                <tr
                  key={product.id}
                  className="border-t text-sm hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-20 h-14 object-cover rounded border"
                    />
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {product.name}
                  </td>

                  <td className="p-3 text-gray-700">
                    ${product.price}
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
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
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
