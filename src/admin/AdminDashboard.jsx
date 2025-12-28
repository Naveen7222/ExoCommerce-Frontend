import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your store from here
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Manage Products */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Products
          </h2>
          <p className="text-gray-600 mb-4">
            View, edit or delete products
          </p>
          <Link to="/admin/products">
            <Button className="w-full">
              Manage Products
            </Button>
          </Link>
        </div>

        {/* Add Product */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Add Product
          </h2>
          <p className="text-gray-600 mb-4">
            Add a new product to your store
          </p>
          <Link to="/admin/products/add">
            <Button className="w-full" variant="outline">
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Manage Categories */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Categories
          </h2>
          <p className="text-gray-600 mb-4">
            View, edit or delete categories
          </p>
          <Link to="/admin/categories">
            <Button className="w-full">
              Manage Categories
            </Button>
          </Link>
        </div>

        {/* Add Category */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Add Category
          </h2>
          <p className="text-gray-600 mb-4">
            Add a new product category
          </p>
          <Link to="/admin/categories/add">
            <Button className="w-full" variant="outline">
              Add New Category
            </Button>
          </Link>
        </div>


      </div>
    </div>
  );
}
