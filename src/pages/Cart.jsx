import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { removeCartItem, updateCartItem } from "../services/api";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { showModal } = useModal();
  const { cartItems: items, setCartItems: setItems, refreshCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await refreshCart();
      } catch (error) {
        console.error("Failed to load cart", error);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [refreshCart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(productId, newQuantity);
      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
      console.error("Failed to update quantity", err);
      showModal({
        title: "Update Failed",
        message: "Could not update quantity. You may have reached the stock limit.",
        type: "error"
      });
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      setItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item", err);
      console.error("Failed to remove item", err);
      showModal({
        title: "Error",
        message: "Failed to remove item from cart.",
        type: "error"
      });
    }
  };

  if (loading) {
    return <Loading manualLoading={true} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 font-medium text-lg">
        {error}
      </div>
    );
  }

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 border-l-4 border-primary pl-4">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <Link to="/">
              <Button size="lg" className="rounded-full px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl p-6 shadow-sm border flex gap-6"
                >
                  <img
                    src={
                      item.imageBase64
                        ? `data:image/jpeg;base64,${item.imageBase64}`
                        : "https://placehold.co/200x200"
                    }
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <Link to={`/products/${item.productId}`}>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                    </Link>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{item.total}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} / each
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
                <Button className="w-full mt-6">Checkout</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
