import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    // Filter and sanitize cart items before sending to backend
    const validCartItems = cartItems
      .filter(item => {
        const product = item.product ? item.product : item;
        return product && product.name && product.image && !isNaN(Number(product.price));
      })
      .map(item => {
        const product = item.product ? item.product : item;
        return {
          ...item,
          product: {
            ...product,
            price: Number(product.price),
          }
        };
      });

    if (validCartItems.length === 0) {
      toast.error('Your cart is empty or contains invalid items.');
      return;
    }

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validCartItems),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || 'Stripe session creation failed.');
      return;
    }

    const data = await response.json();
    if (!data.id) {
      toast.error('Stripe session ID missing.');
      return;
    }

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={120} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => {
            const product = item.product ? item.product : item;
            const key = item._id;
            return (
              <div className="product" key={key}>
                <img src={product.image} className="cart-product-image" alt={product.name} />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{product.name}</h5>
                    <h4>₹{product.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Total Price:</h3>
              <h3>₹{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;

