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
import { useModal } from "../context/ModalContext";

export default function Home() {
  const { refreshCart } = useCart();
  const { showModal } = useModal();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); // Track which product is being added

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
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  /* ========================
     ADD TO CART HANDLER
  ======================== */
  const handleAddToCart = async (productId, productName) => {
    // Prevent multiple simultaneous add to cart operations
    if (addingToCart) return;

    setAddingToCart(productId);
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      console.log("Added to cart:", productId);

      // Show success modal immediately after successful add
      showModal({
        title: "Success!",
        message: `${productName} has been added to your cart.`,
        type: "success"
      });

      // Try to refresh cart to update the badge count
      // If this fails, we don't want to show an error since the add succeeded
      try {
        await refreshCart();
      } catch (refreshError) {
        console.error("Failed to refresh cart, but item was added successfully:", refreshError);
        // Silently fail - the item was added successfully
      }
    } catch (err) {
      console.error("Add to cart failed", err);

      // Show error modal only if the add to cart itself failed
      showModal({
        title: "Error",
        message: err.response?.data?.message || "Failed to add item to cart. Please try again.",
        type: "error"
      });
    } finally {
      setAddingToCart(null);
    }
  };

  /* ========================
     LOADING / ERROR UI
  ======================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-50">
        <div className="w-full max-w-lg">
          <Loading manualLoading={true} size="md" position="relative" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-medium">
        {error}
      </div>
    );
  }

  /* ========================
     MAIN UI
  ======================== */
  return (
    <div className="min-h-screen pb-20">

      {/* HERO SECTION */}
      <div className="relative bg-secondary text-white py-20 px-6 sm:px-12 mb-12 overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-[#2C3E50] to-black opacity-90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-primary opacity-10 rounded-full blur-2xl"></div>

        <div className="relative z-10 container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
            Discover Premium Quality
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated products for the modern lifestyle. Experience the difference with ExoCommerce.
          </p>

          {/* SEARCH BAR IN HERO */}
          <div className="max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:ring-primary backdrop-blur-md !rounded-full !py-4"
              startIcon={
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* CATEGORY FILTER */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <Button
            variant={!selectedCategory ? "primary" : "ghost"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full shadow-none"
          >
            All Collections
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "primary" : "ghost"}
              onClick={() => setSelectedCategory(cat.id)}
              className="rounded-full shadow-none"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-xl text-gray-500 font-medium">
                No products found matching &quot;{searchQuery}&quot;
              </p>
              <Button
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const imageSrc = product.imageBase64
                ? `data:image/jpeg;base64,${product.imageBase64}`
                : "https://placehold.co/600x400?text=No+Image";

              return (
                <Card
                  key={product.id}
                  className="h-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
                    <CardImage
                      src={imageSrc}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                      className="group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Add overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </Link>

                  <div className="flex-grow flex flex-col p-5">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-bold text-secondary">
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  <CardFooter className="p-4 bg-gray-50/50 border-t border-gray-100">
                    <Button
                      className="w-full shadow-none hover:shadow-lg"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={addingToCart === product.id}
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
                      {addingToCart === product.id ? "Adding..." : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
