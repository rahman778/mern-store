import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const pathnames = pathname.split("/").filter(Boolean);

   return (
      <div className="text-sm breadcrumbs">
         <ul>
            {pathnames.length ? (
               <li
                  className="cursor-pointer hover:text-primary transition-all ease-out duration-300"
                  onClick={() => navigate("/")}
               >
                  Home
               </li>
            ) : (
               <li> Home </li>
            )}
            {pathnames.map((name, index) => {
               const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
               const isLast = index === pathnames.length - 1;
               return isLast ? (
                  <li className="capitalize" key={name}>{name}</li>
               ) : (
                  <li
                     className="cursor-pointer hover:text-primary transition-all ease-out duration-300 capitalize"
                     key={name}
                     onClick={() => navigate(routeTo)}
                  >
                     {name}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Breadcrumbs;
