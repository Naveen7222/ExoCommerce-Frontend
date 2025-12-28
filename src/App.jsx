import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import TestLoader from "./pages/TestLoader";

import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAddCategory from "./admin/AdminAddCategory";
import AdminCategories from "./admin/AdminCategories";
import Cart from "./pages/Cart";


const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        // ===== PUBLIC / USER ROUTES =====
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/test-loader", element: <TestLoader /> },
        { path: "/cart", element: <Cart /> },

        // ===== ADMIN ROUTES =====
        {
          path: "/admin",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/products",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/products/add",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/products/edit/:id",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/categories",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCategories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/categories/add",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAddCategory />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: "/exocommerce",
  }
);

import { ModalProvider } from "./context/ModalContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ModalProvider>
  );
}
