import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { authFetch } from "../utils/auth";
import {useCart} from "../context/CartContext";

function CheckoutPage(){
    const BASEURL= import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate= useNavigate();
    const { cartItems, total, clearCart } = useCart();


    const [form, setForm]=useState({
        name: "",
        address: "",
        phone: "",
        payment_methode: "COD",
    });

    const [loading , setLoading]= useState(false);
    const [message, setMessage]= useState(null);

    const handleChange=(e) =>{
        setForm({
            ...form,[e.target.name]: e.target.value,
        });
    }

    const handleSubmit= async(e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try{
            const res= await authFetch(`${BASEURL}/order/create/`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),
            });

            const data=await res.json();

            if (res.ok){
                setMessage("Order placed successfully!");

                fetch(`${BASEURL}/cart/`)
                clearCart();

                setTimeout(() =>{
                    navigate("/");
                }, 2000
                    
                );
            }
            else{
                setMessage(data.error || "Failed to place order. please try again.")
            }
        }catch(error){

            setMessage("An error occurred. Please try again");

        } 
    }


    return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Payment Method */}
        <select
          name="payment_methode"
          value={form.payment_methode}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Payment Method</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Creditcard">Online Payment</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-green-600 font-medium mt-2">{message}</p>
        )}
      </form>
    </div>
  </div>
);

}

export default CheckoutPage;