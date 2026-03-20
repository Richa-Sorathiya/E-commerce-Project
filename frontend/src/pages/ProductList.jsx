import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const { addToCart } = useCart();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/product/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (productId) => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }
    addToCart(productId);
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center relative">
          Our Exclusive Products
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-16px] w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
        </h1>

        {products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Product Card */}
                <ProductCard product={item} />

                {/* Button Row */}
                <div className="flex items-center justify-between m-4 gap-2">
                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition"
                  >
                    Add to Cart
                  </button>

                  {/* View Details */}
                  <button
                    onClick={() => window.location.href = `/product/${item.id}`}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                  >
                    View Details
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex-0 p-2 rounded-full transition-transform transform hover:scale-125"
                    aria-label="Like Product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={likedProducts.includes(item.id) ? "red" : "none"}
                      stroke={likedProducts.includes(item.id) ? "red" : "gray"}
                      strokeWidth="2"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21C12 21 5 14.5 5 9.5C5 6.42 7.42 4 10.5 4C12 4 13.5 5 14 6C14.5 5 16 4 17.5 4C20.58 4 23 6.42 23 9.5C23 14.5 16 21 16 21H12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-8">
            No products available at the moment. Please check back later!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;