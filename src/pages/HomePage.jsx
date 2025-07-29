import React from "react";
import BestRatting from "../components/BestRatting";
import CategoriesProductTab from "../components/CategoriesProductTab";
import FeaturedProduct from "../components/FeaturedProduct";
import ProductSlider from "../components/ProductSlider";
import DiscountProducts from "../components/DiscountProducts";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* === Top Slider === */}
      <section className="pt-8 pb-16">
        <ProductSlider />
      </section>

      {/* === Categories Header === */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-emerald-400 mb-4 drop-shadow-md">
          Explore Our Categories
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
      </section>

      {/* === Best Rating Section === */}
      <section className="relative z-10 py-12">
        <BestRatting />
      </section>

      {/* === Category Product Tabs === */}
      <section className="relative z-10 py-12">
        <CategoriesProductTab />
      </section>

      {/* === Featured Product Slider === */}
      <section className="relative z-10 py-16">
        <FeaturedProduct />
      </section>

      <section>
        <DiscountProducts/>
      </section>
    </div>
  );
};

export default HomePage;
