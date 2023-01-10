import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";
import OrderProgessLayout from "../layout/OrderProgessLayout";

function Cart() {
   return (
      <>
         <OrderProgessLayout title="YOUR CART">
            <CartTable />
         </OrderProgessLayout>
      </>
   );
}

export default Cart;
