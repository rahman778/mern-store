import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
   const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
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
      const isExist = cart.find((product) => product.id === item.id);
      if (isExist) {
         setCart(
            cart.map((i) => {
               if (i.id === item.id) {
                  return { ...i, quantity: i.quantity + 1, subtotal: i.price * (i.quantity + 1) };
               }
               return i;
            })
         );
      } else {
         item.quantity = 1;
         item.subtotal = item.price;
         setCart([...cart, item]);
      }
   };

   const deleteItem = (item) => {
      setCart(cart.filter((i) => i.id !== item.id));
   };

   const increment = (item) => {
      setCart(
         cart.map((i) => {
            if (i.id === item.id) {
               return { ...i, quantity: i.quantity + 1, subtotal: i.price * (i.quantity + 1) };
            }
            return i;
         })
      );
   };

   const decrement = (item) => {
      setCart(
         cart.map((i) => {
            if (i.id === item.id && i.quantity > 1) {
               return { ...i, quantity: i.quantity - 1, subtotal: i.price * (i.quantity - 1) };
            }
            return i;
         })
      );
   };

   return (
      <CartContext.Provider
         value={{ cart, addItem, deleteItem, increment, decrement, cartSubtotal, cartTotal }}
      >
         {children}
      </CartContext.Provider>
   );
};

export { CartContext, CartProvider };
