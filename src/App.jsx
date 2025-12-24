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

export default function App() {
  return <RouterProvider router={router} />;
}
