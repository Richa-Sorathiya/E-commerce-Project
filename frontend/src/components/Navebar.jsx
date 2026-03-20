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
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text tracking-wide"
        >
          Shoppy
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-6">

          {/* Search Button (UI Only) */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-blue-600 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </button>

          {/* Like Button (UI Only) */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-red-500 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 5 14.5 5 9.5C5 6.42 7.42 4 10.5 4C12 4 13.5 5 14 6C14.5 5 16 4 17.5 4C20.58 4 23 6.42 23 9.5C23 14.5 16 21 16 21H12Z"
              />
            </svg>
          </button>

          {/* Auth Links */}
          {!isLoggedIn ? (
            <div className="flex items-center space-x-4">

              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-200 font-medium"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition duration-200 font-medium"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow">
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