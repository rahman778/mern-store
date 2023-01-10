import React from "react";

function Counter({ onIncrement, onDecrement, value = 0 }) {
   return (

      <div className="flex h-8 items-stretch text-gray-600">
         <button
            className="flex items-center justify-center rounded-l-md bg-gray-200 px-3 transition hover:bg-black hover:text-white"
            onClick={onDecrement}
         >
            -
         </button>
         <div className="flex w-full max-w-[35px] items-center justify-center bg-gray-100 px-3 text-xs uppercase transition">
            {value}
         </div>
         <button
            className="flex items-center justify-center rounded-r-md bg-gray-200 px-3 transition hover:bg-black hover:text-white"
            onClick={onIncrement}
         >
            +
         </button>
      </div>
   );
}

export default Counter;
