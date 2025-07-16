import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#0b1120] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-xl max-w-md w-full shadow-lg border border-[#334155]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400 flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6" /> Login to your account
        </h2>

        <label className="block mb-4 relative">
          <span className="text-gray-300 mb-1 block">Email</span>
          <Mail className="absolute left-3 top-[42px] text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-10 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </label>

        <label className="block mb-6 relative">
          <span className="text-gray-300 mb-1 block">Password</span>
          <Lock className="absolute left-3 top-[42px] text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Your password"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-10 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] text-gray-400 hover:text-emerald-400 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold transition transform ${
            loading
              ? "bg-emerald-700 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
          } flex justify-center items-center gap-2`}
        >
          {loading ? "Logging in..." : (
            <>
              <LogIn className="w-5 h-5" />
              Log in
            </>
          )}
        </button>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-emerald-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
