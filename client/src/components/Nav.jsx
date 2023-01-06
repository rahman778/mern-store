// import { useCart } from "context/CartContext";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, User } from "react-feather";
import { useUser } from "../context/UserContext";
import Drawer from "./Drawer";
import Signin from "../pages/Signin";
import { DrawerContext } from "../context/DrawerContext";
// import { useUser } from "context/UserContext";

const userData = {
   fullname: "Abdul Rahman",
   username: "dsdsds",
};

const cartTotal = 0;

const Nav = () => {
   //const { cartTotal } = useCart();
   const { showDrawer } = useContext(DrawerContext);
   const { isLoggedIn, signOut } = useUser();

   return (
      <nav className="flex items-center justify-between px-2 lg:px-28 2xl:px-40 py-2 shadow-sm fixed w-full bg-white top-0 z-10">
         <Link to="/" className="text-gray-700 text-2xl font-bold dark:text-gray-400">
            <h1>PERN Store</h1>
         </Link>

         <ul className="flex space-x-4">
            {!isLoggedIn && (
               <>
                  <li>
                     {/* <Link to="/signin"> */}
                     <button className="btn btn-ghost" onClick={() => showDrawer("AUTH_DRAWER")}>
                        <span>login</span>
                     </button>
                     {/* </Link> */}
                  </li>
                  <li>
                     <div className="dropdown dropdown-end">
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
                              <span className="badge badge-sm indicator-item">8</span>
                           </div>
                        </label>
                        <div
                           tabIndex={0}
                           className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                           <div className="card-body">
                              <span className="font-bold text-lg">8 Items</span>
                              <span className="text-info">Subtotal: $999</span>
                              <div className="card-actions">
                                 <button className="btn btn-primary btn-block">View cart</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
               </>
            )}

            {isLoggedIn && (
               <>
                  <li>
                     <div className="dropdown dropdown-end">
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
                              <span className="badge badge-sm indicator-item">8</span>
                           </div>
                        </label>
                        <div
                           tabIndex={0}
                           className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                           <div className="card-body">
                              <span className="font-bold text-lg">8 Items</span>
                              <span className="text-info">Subtotal: $999</span>
                              <div className="card-actions">
                                 <button className="btn btn-primary btn-block">View cart</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
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
                              <a className="w-full py-2">@{userData?.username}</a>
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
                              <NavLink
                                 className="w-full py-2"
                                 onClick={() => signOut()}
                              >
                                 Logout
                                 <LogOut size={16} />
                              </NavLink>
                           </li>
                        </ul>
                     </div>
                  </li>
               </>
            )}
         </ul>
      </nav>
   );
};

export default Nav;
