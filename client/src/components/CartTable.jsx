import React, { useContext } from "react";
import { X } from "react-feather";
import { CartContext } from "../context/CartContext";
import Counter from "./Counter";
import Price from "./Price";

function CartTable({ cart }) {
   const { increment, decrement, deleteItem } = useContext(CartContext);
   const onIncrement = (item) => {
      increment(item);
   };

   const onDecrement = (item) => {
      decrement(item);
   };

   const onDeleteItem = (item) => {
      deleteItem(item);
   };

   return (
      <div className="overflow-x-auto w-full">
         <table className="table w-full">
            <thead>
               <tr>
                  <th className="relative"></th>
                  <th></th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
               </tr>
            </thead>
            <tbody>
               {cart.map((item) => (
                  <tr>
                     <th>
                        <X className="cursor-pointer" onClick={() => onDeleteItem(item)} />
                     </th>
                     <td>
                        <div className="flex items-center space-x-3">
                                 <img src={item.imageUrl} alt="product" className="h-16 w-20 rounded-md border object-cover object-center"/>
                        </div>
                     </td>
                     <td>
                        <div>{item.name}</div>
                     </td>
                     <td>
                        {" "}
                        <Price currency="$" price={item.price} />
                     </td>
                     <th>
                        <Counter
                           width={"w-20"}
                           height="h-8"
                           value={item.quantity}
                           onIncrement={() => onIncrement(item)}
                           onDecrement={() => onDecrement(item)}
                        />
                     </th>
                     <td>
                        <div>
                           <Price currency="$" price={item.subtotal} customClass="font-bold" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default CartTable;
