import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const productAPI = createApi({
   reducerPath: "productAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getProduct: build.query({
         query: ({ productId }) => ({
            url: `/api/product/${productId}`,
         }),
      }),
      getProducts: build.query({
         query: () => ({
            url: `/api/product`,
         }),
      }),
   }),
});

export const { useGetProductQuery, useGetProductsQuery } = productAPI;
