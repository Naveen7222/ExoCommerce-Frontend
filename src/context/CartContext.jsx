/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchCart } from "../services/api";
import { getToken } from "../utils/auth";

/* ========================
   CONTEXT
======================== */
const CartContext = createContext(null);

/* ========================
   HOOK
======================== */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

/* ========================
   PROVIDER
======================== */
export const CartProvider = ({ children }) => {
  // Cart is ALWAYS an array
  const [cartItems, setCartItems] = useState([]);

  /* ========================
     FETCH / REFRESH CART
  ======================== */
  const refreshCart = useCallback(async () => {
    try {
      const data = await fetchCart();

      // backend returns ARRAY → enforce safety
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.warn("Cart API returned non-array:", data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    }
  }, []);

  /* ========================
     AUTO LOAD ON LOGIN
  ======================== */
  useEffect(() => {
    const token = getToken();
    if (token) {
      refreshCart();
    } else {
      // logout / guest user
      setCartItems([]);
    }
  }, [refreshCart]);

  /* ========================
     CART COUNT (BADGE)
  ======================== */
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      )
    : 0;

  /* ========================
     CONTEXT VALUE
  ======================== */
  const value = {
    cartItems,
    setCartItems,
    cartCount,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
