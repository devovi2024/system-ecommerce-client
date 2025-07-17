import { useProductStore } from '../stores/useProductStore';

const ProductList = () => {
  const { products = [] } = useProductStore();

  if (!products.length) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id || product.id}>
          <h2>{product.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
