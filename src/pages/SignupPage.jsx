import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#0b1120] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-xl max-w-md w-full shadow-lg border border-[#334155]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400">
          Create your account
        </h2>

        {/* Name */}
        <label className="block mb-4">
          <span className="text-gray-300 mb-1 block">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-gray-300 mb-1 block">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </label>

        {/* Password */}
        <label className="block mb-4 relative">
          <span className="text-gray-300 mb-1 block">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-3 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-400 hover:text-emerald-400 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </label>

        {/* Confirm Password */}
        <label className="block mb-6 relative">
          <span className="text-gray-300 mb-1 block">Confirm Password</span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
            className="w-full rounded-md bg-[#0f172a] border border-[#334155] px-3 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-gray-400 hover:text-emerald-400 focus:outline-none"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold transition transform ${
            loading
              ? "bg-emerald-700 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
          } flex justify-center items-center`}
        >
          {loading ? "Loading..." : "Sign up now"}
        </button>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Already a member?{" "}
          <a href="/login" className="text-emerald-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
