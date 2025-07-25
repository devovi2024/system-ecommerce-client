import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  const { featuredProducts, fetchFeaturedProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <section className="max-w-8xl mx-auto overflow-hidden py-16 mb-10 relative">
      {/* Animated floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-emerald-400 rounded-full opacity-30 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="px-6 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-12 drop-shadow-lg">
          🌟 Featured Products
        </h2>

        {loading && <p className="text-gray-300 text-lg">Loading featured products...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {!loading && !error && featuredProducts.length === 0 && (
          <p className="text-center text-gray-400 text-lg">No featured products available.</p>
        )}

      <div>
          {!loading && !error && featuredProducts.length > 0 && (
          <Slider {...settings}>
            {featuredProducts.map((product) => (
              <div className="p-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
      </div>

 
    </section>
  );
};

export default FeaturedProduct;
