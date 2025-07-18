import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link to={`/category/${category.name.toLowerCase()}`} className="block">
      <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <img
          src={category.image || "https://via.placeholder.com/150"}
          alt={category.name}
          className="w-full h-40 object-cover mb-3 rounded"
          loading="lazy"
        />
        <div className="text-center font-semibold text-lg text-gray-800">
          {category.name}
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
