import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    setCart([...cart, item]);
  }

  const deleteItem = (item) => {
    setCart(cart.filter(i => i !== item));
  }

  const increment = (item) => {
    setCart(
      cart.map(i => {
        if (i === item) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      })
    );
  }

  const decrement = (item) => {
    setCart(
      cart.map(i => {
        if (i === item && i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      })
    );
  }

  return (
    <CartContext.Provider value={{ cart, addItem, deleteItem, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
