import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/add-product", element: <AddProduct /> },
        { path: "/products/:id", element: <ProductDetails /> },
      ],
    },
  ],
  {
    basename: "/exocommerce", // ✅ This is the correct place
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
