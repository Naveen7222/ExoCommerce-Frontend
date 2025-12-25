import { useEffect, useState } from "react";
import { fetchCart } from "../services/api";
import { fetchProductById } from "../services/api";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        // 1️⃣ Get cart items (productId + quantity)
        const cartItems = await fetchCart();

        // 2️⃣ Fetch product details for each item
        const detailedItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            const product = await fetchProductById(cartItem.productId);

            return {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: cartItem.quantity,
              total: product.price * cartItem.quantity,
            };
          })
        );

        setItems(detailedItems);
      } catch (error) {
        console.error("Failed to load cart", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>My Cart</h2>

      {items.map((item) => (
        <div key={item.id}>
          <p><strong>{item.name}</strong></p>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ₹{item.total}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
