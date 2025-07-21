import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import LoadingSpinner from "./components/LoadingSpinner";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
  const { user, checkAuth, checkingAuth, loading } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  if (checkingAuth || loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/secret-dashboard"
          element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />}
        />

        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
