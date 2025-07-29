import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import LoadingSpinner from "./components/LoadingSpinner";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCanclePage";
import AdminPage from "./pages/AdminPage";

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

        {/* Admin Route */}
        <Route
          path="/admin-dashboard"
          element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />}
        />

        {/* Redirect /my-section → /my-section/order */}
        <Route path="/my-section" element={<Navigate to="/my-section/order" />} />

        {/* User dashboard tabs */}
        <Route
          path="/my-section/:tab"
          element={user && user.role !== "admin" ? <UserDashboard /> : <Navigate to="/" />}
        />

        {/* Auth */}
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Category page */}
        <Route path="/shop" element={<CategoryPage />} />

        {/* Other pages */}
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />
        <Route path="/purchase-cancel" element={<PurchaseCancelPage />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
