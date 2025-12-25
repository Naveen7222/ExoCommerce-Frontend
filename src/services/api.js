import axios from "axios";
import { getToken, logout } from "../utils/auth";

/* ========================
   AXIOS INSTANCE
======================== */
const api = axios.create({
  baseURL: "http://localhost:8080",
});

/* ========================
   REQUEST INTERCEPTOR
======================== */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ========================
   RESPONSE INTERCEPTOR
======================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired / invalid
      logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;

/* ========================
   PRODUCTS
======================== */
export const fetchProducts = async (categoryId) => {
  const url = categoryId
    ? `/products?categoryId=${categoryId}`
    : "/products";

  const { data } = await api.get(url);
  return data;
};
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// 🔹 ADD PRODUCT
export const addProduct = async (formData) => {
  const { data } = await api.post("/products", formData);
  console.log("products", data);
  return data;
};
// 🔹 UPDATE PRODUCT
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData);
  return data;
};
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

/* ========================
   CATEGORIES
======================== */

export const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const addCategory = async (payload) => {
  const { data } = await api.post("/categories", payload);
  return data;
};


/* ========================
   AUTH
======================== */

// 1️⃣ AUTH REGISTER (JSON ONLY)
export const registerAuthUser = async ({ email, password }) => {
  const { data } = await api.post("/auth/register", {
    email,
    password,
  });
  return data; // { authUserId }
};

// 2️⃣ LOGIN
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data; // { token }
};

/* ========================
   USER PROFILE
======================== */

// 3️⃣ CREATE USER PROFILE (IMAGE OPTIONAL)
export const createUserProfile = async (formData) => {
  const { data } = await api.post("/users", formData);
  return data;
};
/* ========================
   CART
======================== */

// 🔹 GET MY CART
export const fetchCart = async () => {
  const { data } = await api.get("/carts");
  return data; // [{ productId, quantity }]
};

// 🔹 ADD TO CART
export const addToCart = async (payload) => {
  await api.post("/carts/add", payload);
};

// 🔹 UPDATE QUANTITY
export const updateCartItem = async (productId, quantity) => {
  await api.put(`/carts/items/${productId}`, { quantity });
};

// 🔹 REMOVE ITEM
export const removeCartItem = async (productId) => {
  await api.delete(`/carts/items/${productId}`);
};
