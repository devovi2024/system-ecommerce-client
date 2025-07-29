// ✅ Navbar.jsx (with Shop dropdown and auto-close on route change)
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  X,
  UserCircle2,
  LogOut,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import CategoryDropdown from "./CategoryDropdown";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    setShowCategoryDropdown(false); // Close category dropdown on route change
    setDropdownOpen(false);         // Close user dropdown on route change
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform"
        >
          Niribili<span className="text-blue-400">Shop</span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link to="/" className="text-slate-200 hover:text-blue-400 transition">
            Home
          </Link>

          <div className="relative">
            <span
              onClick={() => setShowCategoryDropdown((prev) => !prev)}
              className="cursor-pointer text-slate-200 hover:text-blue-400 transition"
            >
              Shop
            </span>
            <AnimatePresence>
              {showCategoryDropdown && (
                <CategoryDropdown onClose={() => setShowCategoryDropdown(false)} />
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className="text-slate-200 hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/contact" className="text-slate-200 hover:text-blue-400 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-slate-200 text-sm relative">
          <Link to="/cart" className="relative hover:text-blue-400 transition">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={user ? toggleDropdown : () => navigate("/login")}
              className="focus:outline-none"
            >
              {user ? (
                <img
                  src={user?.image || "https://i.pravatar.cc/150?u=default"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-blue-400 shadow-sm cursor-pointer object-cover"
                />
              ) : (
                <UserCircle2 className="w-8 h-8 text-slate-300 hover:text-blue-400 transition" />
              )}
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b">
                    <div className="flex gap-3 items-center">
                      <img
                        src={user?.image || "https://i.pravatar.cc/150?u=default"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDropdownOpen(false)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="flex flex-col p-2 text-sm">
                    {isAdmin ? (
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="py-2 px-3 rounded hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/my-section/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="py-2 px-3 rounded hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/my-section/order"
                          onClick={() => setDropdownOpen(false)}
                          className="py-2 px-3 rounded hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </>
                    )}
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="py-2 px-3 rounded hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left w-full py-2 px-3 rounded hover:bg-red-50 hover:text-red-500 mt-1 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;