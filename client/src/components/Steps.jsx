import React from "react";
import { useNavigate } from "react-router-dom";

function Steps({ steps }) {

   const navigate = useNavigate();

   const activeStatus = steps.find((step) => step.completed === false);

   const getSteps = (step, idx) => {
      if (step?.completed) {
         return (
            <>
               <a onClick={() => navigate(step.path)} className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     stroke-width="2"
                  >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
               </a>
               <span className="font-semibold text-gray-900">{step.title}</span>
            </>
         );
      } else {
         if (activeStatus.id === step.id)
            return (
               <>
                  <a
                     className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                     onClick={() => navigate(step.path)}
                  >
                     {idx + 1}
                  </a>
                  <span className="font-semibold text-gray-900">{step.title}</span>
               </>
            );

         return (
            <>
               <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
               >
                  {idx + 1}
               </a>
               <span className="font-semibold text-gray-500">{step.title}</span>
            </>
         );
      }
   };

   return (
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
         <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
               {steps.map((step, index) => (
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                     {getSteps(step, index)}
                     {index + 1 < steps.length && (
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                           stroke-width="2"
                        >
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                     )}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default Steps;
