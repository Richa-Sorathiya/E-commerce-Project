import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth.js";

function Login() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await fetch(`${BASE}/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                saveToken(data);
                setMsg("Login successful! Redirecting...");
                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setMsg(data.detail || "Login failed");
            }
        } catch (error) {
            console.log("login error", error);
            setMsg("server not reach");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-end px-8 bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/online-fashion-shopping-with-computer_23-2150400628.jpg')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative w-full max-w-md">

                {/* Brand */}
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Shoppy 🛍️
                </h1>

                {/* Login Card */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Sign in to your account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>

                    {msg && (
                        <p className="mt-4 text-center text-sm text-red-500">
                            {msg}
                        </p>
                    )}

                    <div className="mt-6 text-center text-sm text-gray-600">
                        New customer?{" "}
                        <a
                            href="/signup"
                            className="text-indigo-600 hover:underline font-medium"
                        >
                            Create your account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;