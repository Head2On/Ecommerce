import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    // Clear local storage and reset cart context
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    
    // Trigger fireworks animation
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email{' '}
          <span>
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </span>
        </p>
        <Link href="/">
          <button 
            type="button" 
            width="300px" 
            className="btn" 
            aria-label="Continue Shopping">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
