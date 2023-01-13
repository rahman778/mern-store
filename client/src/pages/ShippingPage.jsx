import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OrderProgessLayout from "../layout/OrderProgessLayout";

function ShippingPage() {
   const navigate = useNavigate();
   const [isLoading] = useState(false);

   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => {
      const path = {
         pathname: "/payment",
         search: createSearchParams({
            delivery: data.deliveryMethod,
         }).toString(),
      };
      navigate(path);
   };

   return (
      <OrderProgessLayout title="Shipping Methods">
         <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-6">
            <div className="relative">
               <input
                  {...register("deliveryMethod")}
                  className="peer hidden"
                  value="STANDARD"
                  id="field-standard"
                  type="radio"
                  defaultChecked
               />
               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
               <label
                  className="border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border-gray-300 p-4"
                  for="field-standard"
               >
                  <img
                     className="w-14 object-contain"
                     src="/images/naorrAeygcJzX0SyNI4Y0.png"
                     alt=""
                  />
                  <div className="ml-5">
                     <span className="mt-2 font-semibold">Standard Delivery ($5)</span>
                     <p className="text-slate-500 text-sm leading-6">Delivery: 4-6 Days</p>
                  </div>
               </label>
            </div>
            <div className="relative">
               <input
                  {...register("deliveryMethod")}
                  className="peer hidden"
                  value="EXPRESS"
                  id="field-express"
                  type="radio"
               />
               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
               <label
                  className="border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border-gray-300 p-4"
                  for="field-express"
               >
                  <img
                     className="w-14 object-contain"
                     src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                     alt=""
                  />
                  <div className="ml-5">
                     <span className="mt-2 font-semibold">Express Delivery ($8)</span>
                     <p className="text-slate-500 text-sm leading-6">Delivery: 1-2 Days</p>
                  </div>
               </label>
            </div>
            <div className="mt-8 mb-6">
               <Button title="Countinue Shopping" loading={isLoading} />
            </div>
         </form>
      </OrderProgessLayout>
   );
}

export default ShippingPage;
