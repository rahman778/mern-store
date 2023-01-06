import React from "react";


const Input = React.forwardRef(
   ({ labelText, id, error, helperText, type = "text", ...props }, ref) => {
      return (
         <>
            <div className="relative">
               <input
                  ref={ref}
                  className={`mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1 ${
                     error
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-gray-300/75 focus:border-cyan-500"
                  } appearance-none focus:outline-none focus:ring-0 peer`}
                  type={type}
                  placeholder=" "
                  id={id}
                  {...props}
               />
               
               <p className={`absolute text-xs text-red-600 ${error ? "visible" : "invisible"}`}>
                  {helperText || " "}
               </p>
            </div>
         </>
      );
   }
);

Input.displayName = "Input";

export default Input;
