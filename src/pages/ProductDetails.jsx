import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import ReviewSection from "../components/ReviewSection";
import InfoButtons from "../components/InfoButtons";
import RelatedProduct from "../components/RelatedProduct";
import PeopleAlsoBought from "../components/PeopleAlsoBought ";
import ActionMenu from "../components/ActionMenu";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const { user } = useUserStore();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImageIndex(0);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load product");
      });
  }, [id]);

  if (!product) {
    return <div className="text-center p-10 text-white">Loading...</div>;
  }

  const cartItem = cart.find((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (!user) return toast.error("Please login to add product to cart");

    const productWithFirstImage = {
      ...product,
      images: [product.images[0]], // only include first image
    };

    addToCart(productWithFirstImage);
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

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setCursorPos({ x: xPercent, y: yPercent });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-[#0a1e3d] text-white rounded-xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE GALLERY */}
        <div>
          <div
            className="overflow-hidden rounded-xl mb-4 cursor-zoom-in bg-white p-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <img
              ref={imgRef}
              src={product.images[mainImageIndex]}
              alt={`${product.title} - Image ${mainImageIndex + 1}`}
              className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 ease-out"
              style={{
                transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                transform: isHovered ? "scale(2)" : "scale(1)",
                transition: isHovered
                  ? "transform 0.1s ease-out"
                  : "transform 0.3s ease-out",
              }}
              draggable={false}
            />
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} thumbnail ${index + 1}`}
                onClick={() => setMainImageIndex(index)}
                className={`h-20 w-20 object-cover rounded-xl border-2 cursor-pointer
                  ${mainImageIndex === index ? "border-emerald-400" : "border-transparent"}
                  hover:border-emerald-300 transition`}
                draggable={false}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col justify-between space-y-6">
          <h1 className="text-4xl font-bold text-emerald-400">{product.title}</h1>
          <p className="text-2xl text-emerald-300 font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-white/80 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-4 items-center mt-4">
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
        <ActionMenu />
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
