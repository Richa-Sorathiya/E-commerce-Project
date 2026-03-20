import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (form.password !== form.password2) {
            setMsg("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${BASE}/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                setMsg("Account created successfully! Redirecting...");
                setTimeout(() => navigate("/login"), 1200);
            } else {
                setMsg(data.username || data.password || JSON.stringify(data));
            }
        } catch (error) {
            setMsg("Signup failed");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 px-4">
            <div className="w-full max-w-md bg-white backdrop-blur-md bg-opacity-80 p-8 rounded-3xl shadow-2xl border border-gray-200 animate-fadeIn">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type="password"
                            name="password2"
                            value={form.password2}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Message */}
                {msg && (
                    <p
                        className={`mt-4 text-center text-sm font-medium ${
                            msg.includes("successfully") ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {msg}
                    </p>
                )}

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-purple-600 hover:underline font-medium"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Signup;