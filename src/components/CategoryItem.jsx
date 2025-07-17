import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
  return (
    <Link to={category.href}>
      <div className="p-4 border rounded-lg hover:shadow-lg transition">
        <img
          src={category.image || "https://via.placeholder.com/150"}
          alt={category.name}
          className="w-full h-40 object-cover mb-2 rounded"
        />
        <div className="text-center font-semibold text-lg">
          {category.name}
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
