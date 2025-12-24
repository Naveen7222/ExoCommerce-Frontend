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
import { fetchProducts } from "../services/api";

import ChakraLoader from "../components/ui/ChakraLoader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-neutral-800 tracking-tight">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const imageSrc = product.imageBase64
            ? `data:image/jpeg;base64,${product.imageBase64}`
            : "https://placehold.co/600x400?text=No+Image";



          return (
            <Link key={product.id} to={`/products/${product.id}`} className="block">
              <Card className="h-full flex flex-col hover:shadow-lg transition">
                <CardImage
                  src={imageSrc}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />

                <CardHeader>{product.name}</CardHeader>

                <CardBody className="flex-grow">
                  <p className="mb-4">{product.description}</p>
                  <div className="font-bold text-lg text-primary-600">
                    ${product.price}
                  </div>
                </CardBody>

                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
