import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Product = ({ product }) => {
  // Define your API's base URL
  const { onAdd } = useStateContext();

  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <div className="product-card">
          {/* IMPORTANT: This line creates the full image URL */}
          <img
            src={product.image}
            className="product-image"
            alt={product.name}
          />
          
          {/* You can add other details here */}
          {product.brand && <p className="product-brand">{product.brand}</p>}
          
          <p className="product-name">{product.name}</p>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>
      <button type="button" className="btn" onClick={() => onAdd(product, 1)}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;