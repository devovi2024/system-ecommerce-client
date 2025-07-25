import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ShoppingCart, Minus, Plus, Heart, HeartOff } from "lucide-react";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import ReviewSection from "../components/ReviewSection";
import InfoButtons from "../components/InfoButtons";
import RelatedProduct from "../components/RelatedProduct";
import PeopleAlsoBought from "../components/PeopleAlsoBought ";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { user } = useUserStore();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.includes(id));
  }, [id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((pid) => pid !== id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      wishlist.push(id);
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const cartItem = cart.find((item) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!user) return toast.error("Please login to add product to cart");
    addToCart(product);
  };

  const handleIncrease = () => {
    updateQuantity(product._id, cartItem.quantity + 1);
  };

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, cartItem.quantity - 1);
    }
  };

  if (!product)
    return <div className="text-center p-10 text-white">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-[#0a1e3d] text-white rounded-xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-contain bg-white rounded-xl p-6"
        />
        <div className="flex flex-col justify-between space-y-6">
          <h1 className="text-4xl font-bold text-emerald-400">{product.title}</h1>
          <p className="text-2xl text-emerald-300 font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-white/80 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <button
              onClick={toggleWishlist}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border ${
                isWishlisted
                  ? "bg-red-600 border-red-700"
                  : "bg-white/10 border-white/20"
              } hover:scale-105 transition`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? (
                <>
                  <HeartOff className="text-white" size={18} />
                  <span className="text-sm">Wishlisted</span>
                </>
              ) : (
                <>
                  <Heart className="text-white" size={18} />
                  <span className="text-sm">Add to Wishlist</span>
                </>
              )}
            </button>
            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition active:scale-95"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-white rounded-full px-4 py-2">
                  <button
                    onClick={handleDecrease}
                    className="p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <Minus className="text-white" size={18} />
                  </button>
                  <span className="text-xl font-bold px-2">{cartItem.quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="p-1 rounded-full hover:bg-green-600 transition"
                  >
                    <Plus className="text-white" size={18} />
                  </button>
                </div>
                <div className="text-sm text-white/70 flex items-center gap-2">
                  <ShoppingCart size={18} className="text-emerald-400" />
                  In Cart
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <InfoButtons />
      </div>

      <div className="mt-10">
        <ReviewSection productId={id} userToken={user?.token} />
      </div>

      <div className="mt-10">
        <RelatedProduct productId={id} />
      </div>

      <div className="mt-10">
        <PeopleAlsoBought productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
