import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";
import Signin from "../pages/Signin";
import { DrawerContext } from "../context/DrawerContext";
import Signup from "../pages/Signup";

const Layout = () => {
   const { drawer } = useContext(DrawerContext);

   const [showRegister, setShowRegister] = useState(false);

   return (
      <>
         <div className="min-h-screen flex flex-col">
            <Nav />

            <Drawer isOpen={drawer.AUTH_DRAWER}>
               {showRegister ? (
                  <Signup onShowSignin={() => setShowRegister(false)} />
               ) : (
                  <Signin onShowCreateAccount={() => setShowRegister(true)} />
               )}
            </Drawer>

            <div className="text-gray-700 mt-20 mx-auto px-2 lg:px-28 2xl:px-40 flex-grow h-full w-full">
               <main className="h-full">
                  {" "}
                  <Outlet />
               </main>
            </div>

            <footer className="mt-auto flex justify-center py-2">
               <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
                  © 2023 MERN E-Commerce —
                  <a
                     href="https://github.com/rahman778"
                     className="text-gray-500 ml-1"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     @rahman778
                  </a>
               </p>
            </footer>
         </div>
      </>
   );
};

export default Layout;
