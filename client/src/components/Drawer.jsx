import React, { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";

export default function Drawer({ children, isOpen, setIsOpen }) {
   const { hideDrawer } = useContext(DrawerContext);
   return (
      <main
         className={
            " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in " +
            (isOpen
               ? " transition-opacity opacity-100 duration-500 translate-x-0  "
               : " delay-300 translate-x-full  ")
         }
      >
         <section
            className={
               " w-screen max-w-sm right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
               (isOpen ? " translate-x-0 " : " translate-x-full ")
            }
         >
            <article className="p-4 relative pb-10 flex flex-col space-y-5 overflow-y-auto h-full">
               <label
                  className="btn btn-sm btn-circle bg-zinc-200 border-zinc-200 text-zinc-600 absolute left-3 top-3 font-bold text-lg hover:text-white"
                  onClick={() => {
                     hideDrawer();
                  }}
               >
                  ✕
               </label>
               {children}
            </article>
         </section>
         <section
            className=" w-screen h-full cursor-pointer "
            onClick={() => {
               hideDrawer();
            }}
         ></section>
      </main>
   );
}
