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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                {item.product_image && (
                  <img
                    src={`${BASEURL}${item.product_image}`}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800">{item.product_name}</h2>
                <p className="text-gray-600 mt-1">${item.product_price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  -
                </button>

                <span className="font-medium w-6 text-center">{item.quantity}</span>

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
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-6 bg-white shadow-md rounded-lg">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">Total</h2>
              <p className="text-3xl font-bold text-gray-900 mt-1">${total.toFixed(2)}</p>
            </div>

            <Link
              to="/checkout"
              className="mt-4 sm:mt-0 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
