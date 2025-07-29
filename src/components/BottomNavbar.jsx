import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  ShoppingCart,
  LogIn,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryDropdown from "./CategoryDropdown";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import CartPage from "../pages/CartPage";

const BottomNavbar = () => {
  const { cart } = useCartStore();
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const categoryRef = useRef(null);
  const profileRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-green-600 flex justify-around items-center py-2 px-4 md:hidden shadow-2xl">
        {/* Category */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => {
              setCategoryOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="flex flex-col items-center text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <AnimatePresence>
            {categoryOpen && (
              <CategoryDropdown mobile onClose={() => setCategoryOpen(false)} />
            )}
          </AnimatePresence>
        </div>

        {/* Home */}
        <Link to="/" className="flex flex-col items-center text-white">
          <Home className="w-6 h-6" />
        </Link>

        {/* Cart (opens drawer) */}
        <div className="relative flex flex-col items-center text-white">
          <button onClick={() => setCartOpen(true)}>
            <ShoppingCart className="w-6 h-6" />
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </div>

        {/* Profile/Login */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              if (!user) return navigate("/login");
              setProfileOpen((prev) => !prev);
              setCategoryOpen(false);
            }}
          >
            {user ? (
              <img
                src={user?.image || "https://i.pravatar.cc/150?u=guest"}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border-2 border-white bg-white flex items-center justify-center">
                <LogIn className="w-5 h-5 text-green-600" />
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {user && profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 right-0 w-72 bg-white text-gray-800 rounded-xl shadow-2xl z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex gap-3 items-center">
                    <img
                      src={user?.image || "https://i.pravatar.cc/150?u=default"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold leading-tight">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileOpen(false)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex flex-col p-2">
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="py-2 px-3 rounded hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/my-section/profile"
                        onClick={() => setProfileOpen(false)}
                        className="py-2 px-3 rounded hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/my-section/order"
                        onClick={() => setProfileOpen(false)}
                        className="py-2 px-3 rounded hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="py-2 px-3 rounded hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left w-full py-2 px-3 rounded hover:bg-red-50 hover:text-red-500 mt-1"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Cart Drawer Component */}
      <CartPage isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default BottomNavbar;
