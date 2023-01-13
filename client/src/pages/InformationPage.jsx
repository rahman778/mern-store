import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useUser } from "../context/UserContext";
import OrderProgessLayout from "../layout/OrderProgessLayout";
import { useAddAddressMutation } from "../services/addressService";
import { useGetUserQuery } from "../services/userService";

function InformationPage() {
   const navigate = useNavigate();
   const { isLoggedIn } = useUser();

   const [isLoading, setIsLoading] = useState(false);

   const { data: profileData } = useGetUserQuery({}, { skip: !isLoggedIn });

   const [addAddress, { error: addAddressError }] = useAddAddressMutation();

   useEffect(() => {
      if (addAddressError) {
         toast.error(addAddressError.data.message);
      }
   }, [addAddressError]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   const onSubmit = async (values) => {
      if (!isLoggedIn) {
         toast.error("Please login to continue 🔓")
         return;
      } 
      setIsLoading(true);

      try {
         const { data } = await addAddress({
            values: {...values},
         });

         if (data.success) {
            toast.success("Address added successfully");
            navigate("/shipping");
         }

         setIsLoading(false);
         
      } catch (error) {
         setIsLoading(false);
      }
   };

   return (
      <OrderProgessLayout title="Personal Information">
         <form
            className="flex flex-col w-full px-2"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
         >
            <div className="flex flex-col md:flex-row md:gap-x-5">
               <label className="block md:w-1/2">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                     First Name
                  </span>
                  <Input
                     {...register("firstName", {
                        required: { value: true, message: "Please enter first name." },
                     })}
                     id="firstName"
                     labelText="First Name"
                     error={errors.firstName ? true : false}
                     helperText={errors.firstName ? errors.firstName.message : null}
                  />
               </label>
               <label className="block md:w-1/2">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                     Last Name
                  </span>
                  <Input
                     {...register("lastName", {
                        required: { value: true, message: "Please enter last name." },
                     })}
                     id="lastName"
                     labelText="Last Name"
                     error={errors.lastName ? true : false}
                     helperText={errors.lastName ? errors.lastName.message : null}
                  />
               </label>
            </div>

            <label className="block mt-5">
               <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Country
               </span>
               <Input
                  {...register("country", {
                     required: { value: true, message: "Please enter country." },
                  })}
                  id="country"
                  error={errors.country ? true : false}
                  helperText={errors.country ? errors.country.message : null}
               />
            </label>

            <label className="block mt-5">
               <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Address
               </span>
               <Input
                  {...register("address", {
                     required: { value: true, message: "Please enter address." },
                  })}
                  id="address"
                  error={errors.address ? true : false}
                  helperText={errors.address ? errors.address.message : null}
               />
            </label>

            <div className="flex flex-col md:flex-row md:gap-x-5 mt-5">
               <label className="block md:w-1/2">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                     City
                  </span>
                  <Input
                     {...register("city", {
                        required: { value: true, message: "Please enter city." },
                     })}
                     id="city"
                     labelText="First Name"
                     error={errors.city ? true : false}
                     helperText={errors.city ? errors.city.message : null}
                  />
               </label>
               <label className="block md:w-1/2">
                  <span className="block text-sm font-medium text-slate-700">Zip Code</span>
                  <Input id="zipCode" labelText="Zip Code" />
               </label>
            </div>

            <div className="mt-8 mb-6">
               <Button
                  title={isLoggedIn ? "Countinue Shopping" : "SignIn to continue"}
                  loading={isLoading}
               />
            </div>
         </form>
      </OrderProgessLayout>
   );
}

export default InformationPage;
