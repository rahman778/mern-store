import React from "react";

function Price({ price, currency, loading, customClass }) {
   return (
      <div className={`${customClass}`}>
         {!loading ? (
            <>
               {currency || "$"}
               {price?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
               })}
            </>
         ) : (
            "Loading..."
         )}
      </div>
   );
}

export default Price;
