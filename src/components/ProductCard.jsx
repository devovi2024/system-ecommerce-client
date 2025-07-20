import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
