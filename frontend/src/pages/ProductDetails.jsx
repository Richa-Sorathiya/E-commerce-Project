import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams(); // get product ID from URL
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/product/${id}/`) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
                <p className="text-xl font-semibold text-gray-600">Product not found</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }

        addToCart(product.id);
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6 md:p-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-gray-900 font-bold text-2xl mb-6">${product.price}</p>

                    <button 
                        onClick={handleAddToCart} 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition duration-300"
                    >
                        Add to Cart
                    </button>

                    <div className="mt-6">
                        <a href="/" className="text-blue-600 hover:underline flex items-center">
                            &larr; Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;