import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { removeCartItem, updateCartItem, placeOrder } from "../services/api";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { showModal } = useModal();
  const { cartItems: items, setCartItems: setItems, refreshCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        await refreshCart();
      } catch (err) {
        console.error("Failed to load cart", err);
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
            ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
      showModal({
        title: "Update Failed",
        message: "Could not update quantity. You may have reached the stock limit.",
        type: "error",
      });
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Failed to remove item", err);
      showModal({
        title: "Error",
        message: "Failed to remove item from cart.",
        type: "error",
      });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setPlacingOrder(true);
    try {
      const order = await placeOrder();
      await refreshCart();
      navigate(`/orders/success/${order.orderId}`);
    } catch (err) {
      console.error("Order failed", err);
      showModal({
        title: "Checkout Failed",
        message:
          err.response?.data?.error ||
          "Something went wrong while placing the order.",
        type: "error",
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <Loading manualLoading />;
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
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-10 border-l-4 border-primary pl-4">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-[#1E293B]/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <Link to="/">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
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
                  className="bg-[#1E293B]/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/5 flex gap-6 transition-transform hover:-translate-y-1 duration-300"
                >
                  <img
                    src={
                      item.imageBase64
                        ? `data:image/jpeg;base64,${item.imageBase64}`
                        : "https://placehold.co/200x200"
                    }
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover border border-white/10"
                  />

                  <div className="flex-1">
                    <Link to={`/products/${item.productId}`}>
                      <h3 className="text-lg font-bold text-white hover:text-primary transition-colors">{item.name}</h3>
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
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary text-white font-bold disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary text-white font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-white text-lg">₹{item.total}</p>
                    <p className="text-sm text-slate-400 mb-2">
                      ₹{item.price} / each
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.productId)}
                      className="opacity-80 hover:opacity-100"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Order Summary</h3>
                <div className="flex justify-between font-bold text-lg text-white mb-6">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>
                <Button
                  className="w-full py-4 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40"
                  onClick={handleCheckout}
                  disabled={placingOrder || items.length === 0}
                >
                  {placingOrder ? "Placing Order..." : "Checkout"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
