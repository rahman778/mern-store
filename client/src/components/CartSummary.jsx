import React, { useContext } from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Price from "./Price";

function CartSummary({ checkoutLink }) {
   const navigate = useNavigate();

   const { cartSubtotal } = useContext(CartContext);

   return (
      <div class="w-full bg-gray-50 rounded-md">
         <div class="flex flex-col lg:px-6 px-4 pb-4 justify-between overflow-y-auto">
            <div>
               <p class="text-xl font-medium pt-4">Cart Summary</p>
               <div class="mt-4 border-t border-b py-2">
                  <div class="flex items-center justify-between mt-4">
                     <p class="text-sm font-medium text-gray-900">Subtotal</p>
                     <Price currency="$" price={cartSubtotal} customClass="font-semibold text-gray-900" />
                  </div>
                  <div class="flex items-center justify-between mt-2 mb-4">
                     <p class="text-sm font-medium text-gray-900">Shipping</p>
                     <Price currency="$" price={8} customClass="font-semibold text-gray-900" />
                  </div>
               </div>
            </div>
            <hr />
            <div class="mt-6 flex items-center justify-between">
               <p class="text-lg font-medium text-gray-900">Total</p>
               <Price currency="$" price={8 + Number(cartSubtotal)} customClass="text-2xl font-semibold" />
            </div>

            {checkoutLink !== null && (
               <div className="mt-8">
                  <button
                     type="button"
                     onClick={() => navigate(checkoutLink)}
                     className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                     Checkout
                     <ArrowRight
                        fontSize={12}
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                     />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default CartSummary;
