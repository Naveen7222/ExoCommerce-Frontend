import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-2">
        Admin Dashboard
      </h1>
      <p className="text-slate-400 mb-8">
        Manage your store from here
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Manage Products */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Products
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            View, edit or delete products from your inventory.
          </p>
          <Link to="/admin/products">
            <Button className="w-full shadow-lg shadow-primary/20">
              Manage Products
            </Button>
          </Link>
        </div>

        {/* Add Product */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Add Product
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Add a new product to your store catalog.
          </p>
          <Link to="/admin/products/add">
            <Button className="w-full" variant="outline">
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Manage Categories */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Categories
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            View, edit or delete product categories.
          </p>
          <Link to="/admin/categories">
            <Button className="w-full" variant="outline">
              Manage Categories
            </Button>
          </Link>
        </div>

        {/* Add Category */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Add Category
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Add a new product category to organize items.
          </p>
          <Link to="/admin/categories/add">
            <Button className="w-full" variant="outline">
              Add New Category
            </Button>
          </Link>
        </div>

        {/* Promote User to Admin */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Promote User
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Grant admin privileges to a user account.
          </p>
          <Link to="/admin/promote-user">
            <Button className="w-full" variant="outline">
              Promote to Admin
            </Button>
          </Link>

        </div>

        {/* Demote Admin to User */}
        <div className="bg-[#1E293B]/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Demote Admin
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Remove admin privileges from a user account.
          </p>
          <Link to="/admin/demote-admin">
            <Button className="w-full" variant="outline">
              Demote to User
            </Button>
          </Link>
        </div>


      </div>
    </div>
  );
}
