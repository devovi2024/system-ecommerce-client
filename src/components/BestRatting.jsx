import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestRating = () => {
  const { topRated, fetchTopRated, loading, error } = useProductStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTopRated();
  }, [fetchTopRated]);

  // Filter products with averageRating > 0
  const ratedProducts = topRated.filter((p) => p.averageRating > 0);

  const productsPerSlide = 5;
  const totalSlides = Math.ceil(ratedProducts.length / productsPerSlide);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Get current slide's products slice
  let currentSlideProducts = ratedProducts.slice(
    currentIndex * productsPerSlide,
    currentIndex * productsPerSlide + productsPerSlide
  );

  // If last slide has fewer than productsPerSlide, wrap around to fill
  if (currentSlideProducts.length < productsPerSlide && ratedProducts.length > 0) {
    currentSlideProducts = currentSlideProducts.concat(
      ratedProducts.slice(0, productsPerSlide - currentSlideProducts.length)
    );
  }

  if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg font-medium">{error}</p>;
  if (ratedProducts.length === 0)
    return (
      <p className="text-gray-500 text-center italic mt-10 text-lg">
        No rated products yet.
      </p>
    );

  return (
    <div className="relative max-w-8xl px-6 py-12">
      {/* Background banner */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 filter blur-xl rounded-lg pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Content overlay */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-white drop-shadow-lg">
          Top Rated Products
        </h2>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-opacity-90 hover:bg-opacity-100 shadow-lg rounded-full p-3 flex items-center justify-center transition"
            style={{ width: 58, height: 68 }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-opacity-90 hover:bg-opacity-100 shadow-lg rounded-full p-3 flex items-center justify-center transition"
            style={{ width: 58, height: 68 }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Slider */}
          <div className="flex space-x-8 overflow-hidden">
            {currentSlideProducts.map((product, index) => (
              <div
                key={`${product._id}-${index}`}
                className="flex-shrink-0 w-[20%] max-w-[20%]"
              >
                <ProductCard product={product} large />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestRating;
