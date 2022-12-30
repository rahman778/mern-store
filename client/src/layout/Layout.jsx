import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ children, loading }) => {
   return (
      <>
         <div className="min-h-screen flex flex-col">
            <Nav />

            <div className="text-gray-700 mt-20 mx-auto px-2 lg:px-36 flex-grow h-full w-full">
               <main className="h-full"> <Outlet /></main>
            </div>

            <footer className="mt-auto flex justify-center py-2">
               <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
                  © 2023 MERN E-Commerce —
                  <a href="https://github.com/rahman778" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">
                     @rahman778
                  </a>
               </p>
            </footer>
         </div>
      </>
   );
};

export default Layout;
