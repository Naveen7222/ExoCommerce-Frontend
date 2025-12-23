import axios from "axios";

/* ========================
   AXIOS INSTANCE
======================== */
const api = axios.create({
  baseURL: "http://localhost:8080",
});

/* ========================
   PRODUCTS
======================== */
export const fetchProducts = async () => {
  const { data } = await api.get("/products");
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
