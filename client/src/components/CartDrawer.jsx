import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import CartItem from "./CartItem";
import { ArrowRight, ShoppingCart } from "react-feather";
import Counter from "./Counter";
import { CartContext } from "../context/CartContext";
import Price from "./Price";
import { DrawerContext } from "../context/DrawerContext";

function CartDrawer() {
   const navigate = useNavigate();
   const { cart, cartSubtotal } = useContext(CartContext);
   const { hideDrawer } = useContext(DrawerContext);

   const handleBtnClick = (route) => {
      navigate(route);
      hideDrawer();
   };

   return (
      <div>
         <div className="pr-1 h-[49vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-slate-400 scrollbar-thumb-rounded scrollbar-w-1">
            <div>
               {cart.length > 0 ? cart.map((item) => (
                  <div className="mb-5" key={item._id}>
                     <CartItem cartData={item} />
                  </div>
               )): <h4 className="mt-8 text-gray-600 text-xl text-center">You cart is empty</h4>}
            </div>
         </div>
         <hr className="my-5" />

         {cartSubtotal > 0 && (
            <div className="mt-5 flex items-center justify-between w-full">
               <p className="font-bold text-lg text-gray-900 mb-0">Subtotal</p>

               <Price
                  currency="$"
                  price={cartSubtotal}
                  customClass="font-bold text-gray-900 text-lg"
               />
            </div>
         )}

         <div className="mb-5 mt-7">
            <button
               type="button"
               className="group inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-600"
               onClick={() => handleBtnClick("/cart")}
               disabled={cart.length === 0}
            >
               Cart
               <ShoppingCart
                  fontSize={12}
                  className={`${cart.length !== 0 && "group-hover:ml-8"} ml-4 h-5 w-5 transition-all`}
               />
            </button>
         </div>

         <button
            type="button"
            className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            onClick={() => handleBtnClick("/information")}
            disabled={cart.length === 0}
         >
            Checkout
            <ArrowRight fontSize={12} className={`${cart.length !== 0 && "group-hover:ml-8"} ml-4 h-6 w-6 transition-all`} />
         </button>
      </div>
   );
}

export default CartDrawer;
