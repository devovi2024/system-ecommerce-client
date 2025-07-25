import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, Lock, LogOut } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wider hover:scale-105 transition-transform"
        >
          Niribili<span className="text-blue-400">Shop</span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link to="/" className="text-slate-200 hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/shop" className="text-slate-200 hover:text-blue-400 transition">
            Shop
          </Link>
          <Link to="/about" className="text-slate-200 hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/contact" className="text-slate-200 hover:text-blue-400 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-slate-200 text-sm">
          {!isAdmin && user && (
            <Link to="/cart" className="relative group hover:text-blue-400 transition">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              <Lock className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          )}

          {(user || isAdmin) ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Signup</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
