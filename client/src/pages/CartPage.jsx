import React, { useContext } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";
import OrderProgessLayout from "../layout/OrderProgessLayout";
import { CartContext } from "../context/CartContext";

function Cart() {
   const { cart } = useContext(CartContext);
   return (
      <>
         <OrderProgessLayout title="Your Cart">
            <CartTable cart={cart}/>
         </OrderProgessLayout>
      </>
   );
}

export default Cart;
