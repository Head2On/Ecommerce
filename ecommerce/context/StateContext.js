import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
  setTotalPrice((prevTotalPrice) => Number(prevTotalPrice) + Number(product.price) * Number(quantity));
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct; // Return the original product if it's not the one we're updating
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    if (!foundProduct) return; // Safety check

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

  setTotalPrice((prevTotalPrice) => Number(prevTotalPrice) - Number(foundProduct.price) * Number(foundProduct.quantity));
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  // --- REFACTORED FUNCTION ---
  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    // 1. Safety Check: If product is not found, do nothing. This prevents the crash.
    if (!foundProduct) return;

    // 2. Use .map() to create a new array with the updated item.
    const updatedCartItems = cartItems.map(item => {
      if (item._id === id) {
        if (value === 'inc') {
          // Update total price and quantities
          setTotalPrice(prevTotalPrice => Number(prevTotalPrice) + Number(foundProduct.price));
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
          // Return the item with increased quantity
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === 'dec') {
          if (item.quantity > 1) {
            // Update total price and quantities
            setTotalPrice(prevTotalPrice => Number(prevTotalPrice) - Number(foundProduct.price));
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            // Return the item with decreased quantity
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      }
      // 3. For all other items, return them unchanged.
      return item;
    });

    setCartItems(updatedCartItems);
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);