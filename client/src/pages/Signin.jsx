import React, { useContext, useEffect, useState } from "react";
import { useLocation, redirect, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useSignInMutation } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import { DrawerContext } from "../context/DrawerContext";

function Signin({ onShowCreateAccount }) {
   const { setIsLoggedIn } = useUser();
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { hideDrawer } = useContext(DrawerContext);

   const [signIn, { error: signInError }] = useSignInMutation();

   useEffect(() => {
      if (signInError) {
         setError(signInError.data.message);
      }
   }, [signInError]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "all" });

   const onSubmit = async (data) => {
      const { email, password } = data;

      try {
         setError("");
         setIsLoading(true);
         const { data } = await signIn({ email, password });

         if (data.token) {
            hideDrawer();
            localStorage.setItem("AccessToken", JSON.stringify(data.token));
            toast.success("Login successful 🔓");
         }

         setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
         }, 1500);
      } catch (error) {
         setIsLoading(false);
      }
   };

   return (
      <div>
         <form
            className="flex flex-col w-full px-2"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
         >
            <div className="mt-6">
               <label className="block">
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
            </div>

            <div className="mt-5">
               <label className="block">
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
            </div>

            {error && <p className="mt-4 text-red-6000 text-sm">{error}</p>}
            {/* <div className="mt-4">
               <ForgotPasswordModal />
            </div> */}
            <div className="mt-8">
               <Button title="Log in" loading={isLoading} />
            </div>

            <p className="text-sm mt-4">
               <NavLink to="/forgot-password" className="font-bold">
                  Forgot your password?
               </NavLink>
            </p>
         </form>

         <hr className="my-5" />

         <p className="text-sm px-2 text-center">
            Don't have an account?{" "}
            <a className="font-bold cursor-pointer" onClick={() => onShowCreateAccount()}>
               Create an account
            </a>
         </p>
      </div>
   );
}

export default Signin;
