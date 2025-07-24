import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  if (!category) return null;

  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group border shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link
        to={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
        className="flex flex-col items-center justify-center h-full p-4 text-center no-underline text-gray-900 hover:text-blue-600"
      >
        <div className="text-3xl font-bold mb-2">{category.name}</div>
      </Link>
    </div>
  );
};

export default CategoryItem;
