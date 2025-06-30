import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const adminEmail = import.meta.env.VITE_STATIC_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_STATIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Admin Login
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your credentials to continue
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/40 focus:border-[#0066cc] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/40 focus:border-[#0066cc] text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
