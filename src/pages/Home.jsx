import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImage,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { fetchProducts, fetchCategories, addToCart } from "../services/api";
import Loading from "../components/ui/Loading";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ui/Toast";
import { getRole } from "../utils/auth";

export default function Home() {
  const { refreshCart } = useCart();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  const userRole = getRole();
  const isAdmin = userRole === 'ADMIN';

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  /* ========================
     LOAD CATEGORIES
  ======================== */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  /* ========================
     LOAD PRODUCTS
  ======================== */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(selectedCategory);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        // Add a small artificial delay to show off the skeleton if it's too fast
        setTimeout(() => setLoading(false), 500);
      }
    };
    loadProducts();
  }, [selectedCategory]);

  /* ========================
     ADD TO CART HANDLER
  ======================== */
  const handleAddToCart = async (productId, productName) => {
    if (addingToCart) return;

    setAddingToCart(productId);
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      addToast(`${productName} added to cart!`, "success");

      try {
        await refreshCart();
      } catch (refreshError) {
        console.error("Failed to refresh cart badge", refreshError);
      }
    } catch (err) {
      console.error("Add to cart failed", err);
      const msg = err.response?.data?.message || "Failed to add item to cart.";
      addToast(msg, "error");
    } finally {
      setAddingToCart(null);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-medium animate-fade-in">
        {error}
      </div>
    );
  }

  /* ========================
     MAIN UI
  ======================== */
  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">

      {/* HERO SECTION */}
      <div className="relative bg-secondary text-white pt-32 pb-24 px-6 sm:px-12 mb-16 overflow-hidden rounded-b-[4rem] shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-black opacity-100 z-0"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary opacity-20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 container mx-auto text-center px-4 max-w-5xl">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 sm:p-12 rounded-[3rem] shadow-2xl mb-12 transform transition-transform hover:scale-[1.01] duration-500">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-slide-up drop-shadow-2xl">
                Premium Quality, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
                  Unmatched Style.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Curated products for the modern lifestyle. Elevate your everyday with ExoCommerce.
              </p>
            </div>
          </div>

          {/* SEARCH BAR IN HERO */}
          <div className="max-w-xl mx-auto animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              wrapperClassName="!mb-0"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-white/20 !rounded-full !py-4 !pl-12 !pr-6 text-lg font-medium shadow-xl hover:bg-white/20 transition-all duration-300"
              startIcon={
                <svg className="h-6 w-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* CATEGORY FILTER */}
        <div className="flex justify-center flex-wrap gap-3 mb-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button
            variant={!selectedCategory ? "primary" : "ghost"}
            onClick={() => setSelectedCategory(null)}
            className={!selectedCategory ? "rounded-full !px-6" : "rounded-full !px-6 text-slate-400 hover:text-white hover:bg-white/10"}
          >
            All Collections
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "primary" : "ghost"}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? "rounded-full !px-6" : "rounded-full !px-6 text-slate-400 hover:text-white hover:bg-white/10"}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <Loading manualLoading={true} />
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#1E293B]/70 backdrop-blur-md rounded-[2rem] shadow-lg border border-white/5 animate-fade-in text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400 mb-8 max-w-sm text-center">
              We couldn&apos;t find any products matching &quot;{searchQuery}&quot;. Try a different term or clear your filters.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => {
              const imageSrc = product.imageBase64
                ? `data:image/jpeg;base64,${product.imageBase64}`
                : "https://placehold.co/600x400?text=No+Image";

              return (
                <div
                  key={product.id}
                  className="animate-fade-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full flex flex-col">
                    <Link to={`/products/${product.id}`} className="block relative overflow-hidden group/image">
                      <CardImage
                        src={imageSrc}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                          View Details
                        </span>
                      </div>
                    </Link>

                    <div className="flex-grow flex flex-col p-5">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-lg font-bold text-white mb-2 hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed h-[2.5em]">
                        {product.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-extrabold text-primary">
                          ${product.price}
                        </span>
                      </div>
                    </div>

                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product.id, product.name)}
                        disabled={addingToCart === product.id || isAdmin}
                        startIcon={
                          addingToCart === product.id ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )
                        }
                      >
                        {isAdmin ? "Admin Account" : addingToCart === product.id ? "Adding..." : "Add to Cart"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
