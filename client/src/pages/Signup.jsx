import React, { useState } from "react";
import { useLocation, redirect, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useSignUpMutation } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";

function Signup({ onShowSignin }) {
   const { setIsLoggedIn } = useUser();
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "all" });

   const [signUp] = useSignUpMutation();

   const onSubmit = async (data) => {
      const { email, password } = data;

      try {
         setError("");
         setIsLoading(true);
         const data = await signUp({ email, password });

         localStorage.setItem("AccessToken", JSON.stringify(data.token));

         toast.success("Signup successful 🔓");

         setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
         }, 1500);
      } catch (error) {
         setIsLoading(false);
         setError(error.response?.data.message);
      }
   };

   return (
      <div>
         <form className="flex flex-col w-full px-2" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-zinc-700 font-semibold text-3xl mt-4 mb-6">Register</h1>
            <div className="">
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

            {error && <p className="mt-2 text-pink-600 text-sm">{error}</p>}
            {/* <div className="mt-4">
          <ForgotPasswordModal />
       </div> */}
            <div className="mt-8">
               <Button title="Register" loading={isLoading} />
            </div>
         </form>

         <hr className="my-5" />

         <p className="text-sm px-2 text-center">
            Already have an account? <a className="font-bold cursor-pointer" onClick={() => onShowSignin()}>Signin</a>
         </p>
      </div>
   );
}

export default Signup;
