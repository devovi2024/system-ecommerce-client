import CategoriesProductTab from "../components/CategoriesProductTab";
import FeaturedProduct from "../components/FeaturedProduct";


const HomePage = () => {


  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
      </div>

      <div>
        <CategoriesProductTab/>
      </div>
      <div>
        <FeaturedProduct/>
      </div>
    </div>
  );
};

export default HomePage;
