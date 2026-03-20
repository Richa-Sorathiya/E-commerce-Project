import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * Number(item.product_price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800 relative">
          Shopping Cart
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-12">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transform transition duration-300"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  {item.product_image && (
                    <img
                      src={`${BASEURL}${item.product_image}`}
                      alt={item.product_name}
                      className="w-28 h-28 object-cover rounded-lg border"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-gray-800">{item.product_name}</h2>
                  <p className="text-gray-700 mt-1 text-lg">${item.product_price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  >
                    -
                  </button>

                  <span className="font-medium w-6 text-center text-gray-800">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">Total</h2>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">${total.toFixed(2)}</p>
              </div>

              <Link
                to="/checkout"
                className="mt-4 sm:mt-0 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:from-pink-500 hover:to-purple-500 transition duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;