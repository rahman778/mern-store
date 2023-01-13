// import { useCart } from "context/CartContext";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, User } from "react-feather";
import { useUser } from "../context/UserContext";
import Drawer from "./Drawer";
import Signin from "../pages/Signin";
import { DrawerContext } from "../context/DrawerContext";
import { CartContext } from "../context/CartContext";
import { useGetUserQuery } from "../services/userService";
// import { useUser } from "context/UserContext";

const Nav = () => {
   //const { cartTotal } = useCart();
   const { cartTotal } = useContext(CartContext);
   const { showDrawer } = useContext(DrawerContext);
   const { isLoggedIn, signOut } = useUser();

   const { data: profileData } = useGetUserQuery();

   return (
      <nav className="flex items-center justify-between px-2 lg:px-28 2xl:px-40 py-2 shadow-sm fixed w-full bg-white top-0 z-10">
         <Link to="/" className="text-gray-700 text-2xl font-bold dark:text-gray-400">
            <h1>MERN Store</h1>
         </Link>

         <ul className="flex space-x-4">
            <li>
               <div className="dropdown dropdown-end" onClick={() => showDrawer("CART_DRAWER")}>
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                     <div className="indicator">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                           />
                        </svg>
                        {cartTotal > 0 && (
                           <span className="badge badge-sm border-primary bg-primary rounded-full indicator-item">
                              {cartTotal}
                           </span>
                        )}
                     </div>
                  </label>
               </div>
            </li>
            {!isLoggedIn ? (
               <li>
                  <button className="btn btn-ghost" onClick={() => showDrawer("AUTH_DRAWER")}>
                     <span>login</span>
                  </button>
               </li>
            ) : (
               <li className="relative">
                  <div className="dropdown dropdown-end z-10">
                     <label tabIndex={0} className="btn btn-ghost rounded-btn">
                        <span className="lg:block hidden">Account</span>
                        <User className="lg:hidden" />
                     </label>
                     <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-white p-2 shadow rounded-box w-52 mt-4"
                     >
                        <li>
                           <a className="w-full py-2">{profileData?.firstName}</a>
                        </li>
                        <li>
                           <NavLink className="w-full py-2" to="/profile">
                              Profile
                           </NavLink>
                        </li>
                        <li>
                           <NavLink className="w-full py-2" to="/orders">
                              Orders
                           </NavLink>
                        </li>
                        <li>
                           <NavLink className="w-full py-2" onClick={() => signOut()}>
                              Logout
                              <LogOut size={16} />
                           </NavLink>
                        </li>
                     </ul>
                  </div>
               </li>
            )}
         </ul>
      </nav>
   );
};

export default Nav;
