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
import {
  fetchProducts,
  fetchCategories,
  addToCart,
} from "../services/api";
import ChakraLoader from "../components/ui/ChakraLoader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const handleAddToCart = async (productId) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      console.log("Added to cart:", productId);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  /* ========================
     LOADING / ERROR UI
  ======================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-full max-w-lg">
          <ChakraLoader manualLoading={true} size="md" position="relative" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  /* ========================
     MAIN UI
  ======================== */
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-neutral-800 tracking-tight">
        Featured Products
      </h1>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <Button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "bg-primary text-white" : ""}
        >
          All
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={
              selectedCategory === cat.id ? "bg-primary text-white" : ""
            }
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const imageSrc = product.imageBase64
            ? `data:image/jpeg;base64,${product.imageBase64}`
            : "https://placehold.co/600x400?text=No+Image";

          return (
            <Card
              key={product.id}
              className="h-full flex flex-col hover:shadow-lg transition"
            >
              {/* IMAGE + NAME → NAVIGATION */}
              <Link to={`/products/${product.id}`}>
                <CardImage
                  src={imageSrc}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
                <CardHeader>{product.name}</CardHeader>
              </Link>

              <CardBody className="flex-grow">
                <p className="mb-4">{product.description}</p>
                <div className="font-bold text-lg text-primary-600">
                  ${product.price}
                </div>
              </CardBody>

              {/* ACTION BUTTON */}
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
