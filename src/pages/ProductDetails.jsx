import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import { addToCart } from "../services/api";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { refreshCart } = useCart();
  const { showModal } = useModal();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (addingToCart) return;

    setAddingToCart(true);
    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
      });

      // Show success modal immediately after successful add
      showModal({
        title: "Success!",
        message: `${product.name} has been added to your cart.`,
        type: "success"
      });

      // Try to refresh cart to update the badge count
      // If this fails, we don't want to show an error since the add succeeded
      try {
        await refreshCart();
      } catch (refreshError) {
        console.error("Failed to refresh cart, but item was added successfully:", refreshError);
        // Silently fail - the item was added successfully
      }
    } catch (err) {
      console.error("Add to cart failed", err);

      // Show error modal only if the add to cart itself failed
      showModal({
        title: "Error",
        message: err.response?.data?.message || "Failed to add item to cart. Please try again.",
        type: "error"
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <Loading manualLoading={true} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (!product) return null;

  const imageSrc = product.imageBase64
    ? `data:image/jpeg;base64,${product.imageBase64}`
    : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-neutral-800">{product.name}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-primary-600 mt-4">
            ${product.price}
          </p>

          {/* Add to Cart Button */}
          <Button
            className="mt-6 w-full max-w-xs"
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
