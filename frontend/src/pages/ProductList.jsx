import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
  console.log("Fetching products from:", `${BASURL}/product/`);
  fetch(`${BASURL}/product/`)
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then(data => {
      console.log("Data:", data);
      setProducts(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 mt-10">
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 col-span-full text-center">
        Product List
      </h1>

      {product.length > 0 ? (
        product.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-600">
          No products available
        </p>
      )}
    </div>
  );
}

export default ProductList;
