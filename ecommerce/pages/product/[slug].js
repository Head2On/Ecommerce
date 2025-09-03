import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={Array.isArray(image) ? image[index] : image} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {Array.isArray(image) ? image.map((item, i) => (
              <img 
                key={i}
                src={item}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            )): null}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">₹{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params: { slug } }) {
  try {
    const productRes = await axios.get(`http://127.0.0.1:8000/api/products/${slug}/`);
    const productsRes = await axios.get(`http://127.0.0.1:8000/api/products/`);

    return {
      props: { product:productRes.data, products:productsRes.data },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { notFound: true }; // Or handle the error as you see fit
  }
}


export default ProductDetails