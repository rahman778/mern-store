import React from "react";
import { X } from "react-feather";
import Counter from "./Counter";

function CartTable() {
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
               <tr>
                  <th>
                     <X className="cursor-pointer"/>
                  </th>
                  <td>
                     <div className="flex items-center space-x-3">
                        <div className="avatar">
                           <div className="mask mask-squircle w-12 h-12">
                              <img src="https://placeimg.com/400/225/arch" alt="product" />
                           </div>
                        </div>
                     </div>
                  </td>
                  <td>
                     <div>Hart Hagerty</div>
                  </td>
                  <td>$17.00</td>
                  <th>
                     <Counter  width={"w-20"} height="h-8"/>
                  </th>
                  <td>
                     <div>
                        <div className="font-bold">$17.00</div>
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}

export default CartTable;
