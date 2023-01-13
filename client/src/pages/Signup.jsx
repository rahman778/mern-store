import React, { useContext, useEffect, useState } from "react";
import { useLocation, redirect, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useSignUpMutation } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import { DrawerContext } from "../context/DrawerContext";

function Signup({ onShowSignin }) {
   const { setIsLoggedIn } = useUser();
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { hideDrawer } = useContext(DrawerContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "all" });

   const [signUp, { error: signUpError }] = useSignUpMutation();

   useEffect(() => {
      if (signUpError) {
         setError(signUpError.data.message);
      }
   }, [signUpError]);

   const onSubmit = async (values) => {
      let formValues = {
         ...values,
         role: "ROLE_CUSTOMER",
      };

      try {
         setError("");
         setIsLoading(true);
         const { data } = await signUp({
            values: formValues,
         });

         if (data.token) {
            hideDrawer();
            localStorage.setItem("AccessToken", JSON.stringify(data.token));
            toast.success("Signup successful 🔓");
         }

         setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
         }, 1500);
      } catch (error) {
         console.log("error", error);
         setIsLoading(false);
      }
   };

   return (
      <div>
         <form className="flex flex-col w-full px-2" onSubmit={handleSubmit(onSubmit)}>
            <label className="block mt-6">
               <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email
               </span>
               <Input
                  {...register("email", {
                     required: { value: true, message: "Please enter a valid email." },
                     // eslint-disable-next-line no-useless-escape
                     pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  id="email"
                  labelText="Email"
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email.message : null}
               />
            </label>
            <label className="block mt-4">
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
            <label className="block mt-4">
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
            <label className="block mt-4">
               <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Mobile No
               </span>
               <Input
                  {...register("phone", {
                     required: { value: true, message: "Please enter last name." },
                  })}
                  id="phone"
                  labelText="Mobile No"
                  error={errors.phone ? true : false}
                  helperText={errors.phone ? errors.phone.message : null}
               />
            </label>

            <label className="block mt-4">
               <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Password
               </span>
               <Input
                  {...register("password", {
                     required: { value: true, message: "Please enter a password." },
                     minLength: {
                        value: 8,
                        message: "Please enter a stronger password.",
                     },
                  })}
                  id="password"
                  labelText="Password"
                  type="password"
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : null}
               />
            </label>

            {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
            {/* <div className="mt-4">
          <ForgotPasswordModal />
       </div> */}
            <div className="mt-8">
               <Button title="Register" loading={isLoading} />
            </div>
         </form>

         <hr className="my-5" />

         <p className="text-sm px-2 text-center">
            Already have an account?{" "}
            <a className="font-bold cursor-pointer" onClick={() => onShowSignin()}>
               Signin
            </a>
         </p>
      </div>
   );
}

export default Signup;
