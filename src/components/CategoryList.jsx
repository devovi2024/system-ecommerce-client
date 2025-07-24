import React, { useEffect } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((cat) => (
        <CategoryItem key={cat._id} category={cat} />
      ))}
    </div>
  );
};

export default CategoryList;
