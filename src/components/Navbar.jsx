import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UserPlus, LogIn, Lock, LogOut } from 'lucide-react';

const Navbar = () => {
  const user = false;
  const isAdmin = false;
  const cartCount = 3;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wider hover:scale-105 transition-transform duration-300"
        >
          Niribili<span className="text-blue-400">Shop</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link to="/" className="text-slate-200 hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/shop" className="text-slate-200 hover:text-blue-400 transition duration-300">Shop</Link>
          <Link to="/about" className="text-slate-200 hover:text-blue-400 transition duration-300">About</Link>
          <Link to="/contact" className="text-slate-200 hover:text-blue-400 transition duration-300">Contact</Link>
        </nav>

        <div className="flex items-center space-x-5 text-slate-200 text-sm">

          {/* If only user (not admin) */}
          {user && !isAdmin && (
            <Link to="/cart" className="relative group hover:text-blue-400 transition">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          )}

          {/* If admin */}
          {isAdmin && (
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-400 transition">
              <Lock className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          )}

          {/* If user or admin -> show Logout */}
          {(user || isAdmin) ? (
            <button className="flex items-center gap-1 hover:text-blue-400 transition">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link to="/signup" className="flex items-center gap-1 hover:text-blue-400 transition">
                <UserPlus className="w-5 h-5" />
                <span>Signup</span>
              </Link>
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-400 transition">
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
