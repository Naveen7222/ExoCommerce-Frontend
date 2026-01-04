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
    <div className="container mx-auto p-8 pt-32">
      <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-white/5">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="flex-1 lg:max-w-xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border-4 border-white/5 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full mb-6"></div>
              <p className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                ${product.price}
                <span className="text-sm font-normal text-slate-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                  Free Shipping
                </span>
              </p>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-lg text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-white/10 pt-8">
              {/* Add to Cart Button */}
              <Button
                className="flex-1 py-4 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40"
                onClick={handleAddToCart}
                disabled={addingToCart}
                startIcon={!addingToCart && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                )}
              >
                {addingToCart ? "Adding to Cart..." : `Add to Cart • $${product.price}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
