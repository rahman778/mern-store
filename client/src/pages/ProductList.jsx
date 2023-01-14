import React from "react";
import Product from "../components/Product";
import { useGetProductsQuery } from "../services/productService";

function ProductList() {
   const { data: products } = useGetProductsQuery();

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
         {products?.items?.map((product) => (
            <div key={product._id}>
               <Product productData={product} />
            </div>
         ))}
      </div>
   );
}

export default ProductList;
