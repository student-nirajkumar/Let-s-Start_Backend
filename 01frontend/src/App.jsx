import { useState } from 'react';
import './App.css';
import { useCustomReactQuery } from './useCustomReactQuery';

function App() {
  const [search, setSearch] = useState('');
  const [products, error, loading] =
    useCustomReactQuery('/api/products', search);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>❌ Something went wrong while fetching products</h2>;
  }

  return (
    <>
      <h1>Chai aur API in React ☕</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Number of Products are: {products.length}</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default App;
