import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAddCategory from "./admin/AdminAddCategory";
import AdminCategories from "./admin/AdminCategories";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import PromoteUser from "./admin/PromoteUser";



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
        { path: "/cart", element: <Cart /> },
        { path: "/orders/success/:orderId", element: <OrderSuccess /> },
        { path: "/orders/my", element: <MyOrders /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Profile />
            </ProtectedRoute>
          )
        },


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
          path: "/admin/promote-user",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <PromoteUser />
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

import { ToastProvider } from "./components/ui/Toast";

export default function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </CartProvider>
    </ModalProvider>
  );
}
