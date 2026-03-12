import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";


function ProductDetails() {
    const { id } = useParams(); // get product ID from URL
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {addToCart} = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/product/${id}/`) // make sure Django endpoint exists
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
            <p className="text-center text-gray-600 mt-10">
                Loading product...
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

    if (!product) {
        return (
            <p className="text-center text-gray-600 mt-10">
                Product not found
            </p>
        );
    }

    const handleAddToCart=() =>{
        if(!localStorage.getItem('access_token')){
            window.location.href='/login';
            return;
        }

        addToCart(product.id);
    }

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md mt-10">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
            />
            <div className="flex-1">
                <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-gray-900 font-bold text-xl mt-3">${product.price}</p>
                <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Add to cart button</button>
                <div className="mt-4">
                    <a href="/" className="text-blue-600 hover: underline"> &larr; Back to home</a>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;









// import { Link } from "react-router-dom";

// function ProductDetails({product}){
//     const BASEURL= import.meta.env.VITE_DJANGO_BASE_URL;

//     return(
//         <link to={`/product/${product.id}`}>
//             <img src={`${BASURL}${product.image}`} alt={product.name} />

//             <h2>{product.name}</h2>
//             <p>${product.price}</p>
//             <p>{product.description}</p>
//         </link>
//     );
// }

// export default ProductDetails