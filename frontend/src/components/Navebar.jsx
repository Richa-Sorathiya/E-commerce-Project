import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearTokens, getAccessToken } from "../utils/auth.js";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          Shop
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-6">

          {/* Auth Links */}
          {!isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-gray-700 text-lg hover:text-blue-600 transition font-medium">
              Cart
            </span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
