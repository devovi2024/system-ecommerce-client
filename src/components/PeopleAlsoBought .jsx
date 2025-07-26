import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";

const PeopleAlsoBought = ({ productId }) => {
  const {
    peopleAlsoBought,
    fetchPeopleAlsoBought,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    if (productId) {
      fetchPeopleAlsoBought(productId);
    }
  }, [productId, fetchPeopleAlsoBought]);

  if (loading)
    return <p className="text-white text-center py-6">Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center py-6">{error}</p>;

  if (peopleAlsoBought.length === 0)
    return <p className="text-white text-center py-6">No related products found.</p>;

  return (
    <section className="mt-10 px-4 md:px-8">
      <h3 className="text-white text-2xl font-semibold mb-6">
        People Who Bought This Also Bought
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {peopleAlsoBought.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PeopleAlsoBought;
