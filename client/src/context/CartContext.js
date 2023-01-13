import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
   const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
   const [cartSubtotal, setCartSubtotal] = useState(0);
   const [cartTotal, setCartTotal] = useState(0);

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   useEffect(() => {
      const quantity = cart?.reduce((acc, cur) => {
         return acc + Number(cur.quantity);
      }, 0);
      const totalAmt = cart?.reduce((acc, cur) => {
         return acc + Number(cur.subtotal);
      }, 0);
      setCartSubtotal(totalAmt);
      setCartTotal(quantity);
   }, [cart]);

   const addItem = (item, quantity) => {
      const isExist = cart.find((product) => product._id === item._id);
      if (isExist) {
         setCart(
            cart.map((i) => {
               if (i._id === item._id) {
                  return {
                     ...i,
                     quantity: i.quantity + quantity,
                     subtotal: i.price * (i.quantity + quantity),
                  };
               }
               return i;
            })
         );
      } else {
         const newItem = Object.assign({}, item, { quantity: 1, subtotal: item.price });
         setCart([...cart, newItem]);
      }
   };

   const deleteItem = (item) => {
      setCart(cart.filter((i) => i._id !== item._id));
   };

   const increment = (item) => {
      setCart(
         cart.map((i) => {
            if (i._id === item._id) {
               return { ...i, quantity: i.quantity + 1, subtotal: i.price * (i.quantity + 1) };
            }
            return i;
         })
      );
   };

   const decrement = (item) => {
      setCart(
         cart.map((i) => {
            if (i._id === item._id && i.quantity > 1) {
               return { ...i, quantity: i.quantity - 1, subtotal: i.price * (i.quantity - 1) };
            }
            return i;
         })
      );
   };

   const clearCart = () => {
      setCart([]);
   };

   return (
      <CartContext.Provider
         value={{
            cart,
            clearCart,
            addItem,
            deleteItem,
            increment,
            decrement,
            cartSubtotal,
            cartTotal,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export { CartContext, CartProvider };
