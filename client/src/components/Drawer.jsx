import React, { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";

export default function Drawer({ children, isOpen, setIsOpen, header }) {
   const { hideDrawer } = useContext(DrawerContext);
   return (
      <main
         className={
            " fixed overflow-hidden z-[12] bg-gray-900 bg-opacity-25 inset-0 transform ease-in " +
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
            <article className="p-4 relative flex flex-col space-y-2 overflow-y-auto h-full">
               <h3 className="font-bold text-center text-2xl mt-2 mb-0">{header}</h3>
               <label
                  className="btn btn-sm btn-circle bg-zinc-200 border-zinc-200 text-zinc-600 absolute left-3 top-4 font-bold text-lg hover:text-white"
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
