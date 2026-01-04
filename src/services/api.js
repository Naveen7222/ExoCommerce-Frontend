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

export const updateCategory = async (id, payload) => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
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

// 🔹 CREATE USER PROFILE (IMAGE OPTIONAL)
export const createUserProfile = async (formData) => {
  const { data } = await api.post("/users", formData);
  return data;
};

// 🔹 GET MY PROFILE (BY ID)
export const fetchUserProfileById = async (userId) => {
  try {
    console.log(`[API] Fetching user profile for userId: ${userId}`);
    const response = await api.get(`/users/${userId}`);
    console.log(`[API] User profile fetch SUCCESS:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[API] User profile fetch FAILED for userId ${userId}`);
    console.error(`[API] Error status:`, error.response?.status);
    console.error(`[API] Error data:`, error.response?.data);
    console.error(`[API] Full error:`, error.message);
    throw error;
  }
};

// 🔹 UPDATE USER PROFILE (DATA + OPTIONAL IMAGE)
export const updateUserProfile = async (userId, { name, phone, address }, imageFile) => {
  const formData = new FormData();

  formData.append(
    "user",
    JSON.stringify({
      name,
      phone,
      address,
    })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const { data } = await api.put(`/users/${userId}`, formData);
  return data;
};


/* ========================
   CART
======================== */

// 🔹 GET MY CART
export const fetchCart = async () => {
  try {
    const { data } = await api.get("/carts");
    console.log("Fetch cart success - Full data:", data);
    console.log("Fetch cart success - Data type:", typeof data);
    console.log("Fetch cart success - Is array:", Array.isArray(data));
    console.log("Fetch cart success - Length:", data?.length);
    if (data && data.length > 0) {
      console.log("Fetch cart success - First item:", data[0]);
      console.log("Fetch cart success - First item keys:", Object.keys(data[0]));
    }
    return data; // [{ productId, quantity }]
  } catch (error) {
    console.error("Fetch cart failed - Status:", error.response?.status);
    console.error("Fetch cart failed - Error data:", error.response?.data);
    throw error;
  }
};

// 🔹 ADD TO CART
export const addToCart = async (payload) => {
  try {
    console.log("Adding to cart with payload:", payload);
    const response = await api.post("/carts/add", payload);
    console.log("Add to cart SUCCESS - Response:", response.data);
    console.log("Add to cart SUCCESS - Status:", response.status);
    return response.data;
  } catch (error) {
    console.error("Add to cart FAILED - Status:", error.response?.status);
    console.error("Add to cart FAILED - Error data:", error.response?.data);
    console.error("Add to cart FAILED - Full error:", error);
    throw error;
  }
};

// 🔹 UPDATE QUANTITY
export const updateCartItem = async (productId, quantity) => {
  await api.put(`/carts/items/${productId}`, { quantity });
};

// 🔹 REMOVE ITEM
export const removeCartItem = async (productId) => {
  await api.delete(`/carts/items/${productId}`);
};

// ========================
// ORDERS
// ========================

export const placeOrder = async () => {
  const { data } = await api.post("/orders");
  return data;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get("/orders/my");
  return data;
};