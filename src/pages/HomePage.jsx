import React from 'react';
import CategoryItem from '../components/CategoryItem';

const categories = [
  { href: "/jeans", name: "Electronics", image: "https://via.placeholder.com/150" },
  { href: "/cloths", name: "Clothes", image: "https://via.placeholder.com/150" },
  { href: "/furniture", name: "Furniture", image: "https://via.placeholder.com/150" },
  { href: "/books", name: "Books", image: "https://via.placeholder.com/150" },
  { href: "/sports", name: "Sports", image: "https://via.placeholder.com/150" },
];

const HomePage = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Explore Our Category</h2>
        <p className="text-gray-600">Discover a wide range of products across various categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          categories.map((category) => (
            <CategoryItem
              category={category}
              key={category.name}
            />
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
