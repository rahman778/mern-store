import React, { useContext } from "react";
import { X } from "react-feather";
import { CartContext } from "../context/CartContext";
import Counter from "./Counter";
import Price from "./Price";

function CartItem({ cartData }) {

   const { increment, decrement,  deleteItem } = useContext(CartContext);

   const onIncrement = () => [
      increment(cartData)
   ]

   const onDecrement = () => {
      decrement(cartData)
   }

   const onDeleteItem = () => {
      deleteItem(cartData)
   }

   return (
     
      <div className="mt-8 space-y-3 bg-white">
         <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img
               className="m-2 ml-0 h-20 w-24 rounded-md border object-cover object-center"
               src={cartData.imageUrl}
               alt="product image"
            />
            <div className="flex w-full flex-col px-2 py-2">
               <span className="font-semibold text-sm">{cartData.name}</span>
               <Price
                     currency="$"
                     price={cartData.subtotal}
                     customClass="mt-1 font-bold"
                  />
            </div>
            <div className="flex column flex-col py-2">
             <div className="mb-1">
                <Counter width={"w-20"} height="h-8" value={cartData.quantity} onIncrement={onIncrement} onDecrement={onDecrement}/>
             </div>
             <div className="m-auto">
             <X size={16} className="cursor-pointer" onClick={onDeleteItem}/>
             </div>
          </div>
         </div>
         
           
      </div>
   );
}

export default CartItem;
