import React, { useContext } from "react";
import { ShoppingCart } from "react-feather";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { DrawerContext } from "../context/DrawerContext";
import Price from "./Price";

function Product(props) {
   const {
      _id,
      name,
      slug,
      imageUrl,
      description,
      quantity,
      price,
      isActive,
      brand,
      category,
      discount,
   } = props.productData;

   const navigate = useNavigate();

   const { addItem } = useContext(CartContext);
   const { showDrawer } = useContext(DrawerContext);

   const handleAddToCart = () => {
      addItem(props.productData, 1);
      showDrawer("CART_DRAWER")
   };

   return (
      <div className="relative w-full max-w-[24rem] overflow-hidden rounded-sm bg-white shadow-md">
         <a onClick={() => navigate(`/product/${_id}`)} className="cursor-pointer">
            <img
               className="h-56 rounded-t-lg object-cover mx-auto"
               //src={imageUrl}
               alt="product image"
            />
         </a>
         {discount && (
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
               Sale
            </span>
         )}

         <div className="mt-4 px-5 pb-5">
            <a href="#">
               <h5 className=" font-semibold tracking-tight text-slate-900">{name}</h5>
            </a>
            <div className="mt-2.5 mb-5 flex items-center">
               {/* <span className="mr-2 rounded bg-yellow-200 px-2 py-0.5 text-xs font-semibold">
                  5.0
               </span> */}
               <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
               <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
               <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
               <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
               <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
            </div>
            <div className="flex items-center justify-between">
               <p>
                  <Price
                     currency="$"
                     price={price}
                     customClass="text-xl font-bold text-slate-900"
                  />
                  {discount && (
                     <span className="text-sm text-slate-900 line-through">$299</span>
                  )}
               </p>
               <button
                  className="flex cursor-pointer items-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
                  onClick={handleAddToCart}
               >
                  {/* <ShoppingCart fontSize={12} className="group-hover:ml-8 ml-4 h-5 w-5 transition-all" /> */}
                  Add to cart
               </button>
            </div>
         </div>
      </div>
   );
}

export default Product;
