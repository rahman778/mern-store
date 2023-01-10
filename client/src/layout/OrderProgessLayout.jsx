import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CartSummary from "../components/CartSummary";
import Steps from "../components/Steps";

export default function OrderProgessLayout({ children, title }) {
   const { pathname } = useLocation();

   const [steps, setSteps] = useState([
      { id: 1, title: "Cart", completed: false, path: "/cart" },
      { id: 2, title: "Information", completed: false, path: "/information" },
      { id: 3, title: "Shipping", completed: false, path: "/shipping" },
      { id: 4, title: "Payment", completed: false, path: "/payment" },
   ]);

   useEffect(() => {
      getActivePath();
   }, [pathname]);

   const getActivePath = () => {
      const findStep = steps.find((step) => step.path === pathname);

      const newState = steps.map((obj) =>
         obj.id < findStep.id ? { ...obj, completed: true } : obj
      );

      setSteps(newState);
   };

   return (
      <>
         {/* <Breadcrumbs /> */}
         <div className="mx-auto mt-3 mb-8 text-center w-full max-w-[600px]">
            <Steps steps={steps} />
         </div>
         <h2 className="font-bold text-3xl text-center mt-5 mb-10">{title}</h2>
         <div className="flex flex-col xl:flex-row">
            <div className="w-2/3">{children}</div>
            <div className="w-1/3 xl:pl-4">
               <CartSummary checkoutLink={pathname === "/cart" ? "/information" : null} />
            </div>
         </div>
      </>
   );
}
