import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";

import ChakraLoader from "../components/ui/ChakraLoader";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ChakraLoader manualLoading={true} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (!product) return null;

  const imageSrc = product.imageBase64
    ? `data:image/jpeg;base64,${product.imageBase64}`
    : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-neutral-800">{product.name}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-primary-600 mt-4">
            ${product.price}
          </p>

          {/* Add to Cart Button */}
          <Button className="mt-6 w-full max-w-xs">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
