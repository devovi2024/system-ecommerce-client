import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ShoppingCart, Tag, BadgeDollarSign } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";

const ProductSlider = () => {
  const { products, fetchAllProducts, loading } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Take top 10 products sorted by price descending
  const top10HighPriceProducts = useMemo(() => {
    return [...products]
      .filter((p) => typeof p.price === "number")
      .sort((a, b) => b.price - a.price)
      .slice(0, 10);
  }, [products]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-16 ">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-lg">
        💎 Top Priced Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading products...</p>
      ) : (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.2 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full"
        >
          {top10HighPriceProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-blue-950 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 flex flex-col"
              >
                <img
                  src={product.images?.[0] || "/no-image.png"}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between gap-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                    <Tag size={20} className="text-indigo-600" />
                    {product.name}
                  </h3>

                  <p className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <BadgeDollarSign size={20} />
                    {typeof product.price === "number"
                      ? `$${product.price.toFixed(2)}`
                      : "Price N/A"}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-5 rounded-xl hover:bg-indigo-700 transition"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductSlider;
