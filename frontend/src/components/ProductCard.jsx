const BASURL = import.meta.env.VITE_DJANGO_BASE_URL; // use for images
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (

        <Link to={`/product/${product.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                <img
                    src={`${BASURL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                />

                <h2 className="text-lg font-semibold text-gray-800 mt-3">
                    {product.name}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                    {product.description}
                </p>

                <p className="text-gray-900 font-bold text-lg mt-2">
                    ${product.price}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;
