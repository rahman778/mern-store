import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const cartAPI = createApi({
   reducerPath: "cartAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      addCart: build.mutation({
         query: ({  values }) => ({
            url: `/api/cart/add`,
            method: "POST",
            body: { ...values },
         }),
      }),
      getCart: build.query({
         query: ({ cartId }) => ({
            url: `/api/cart/${cartId}`,
         }),
      }),
      getCarts: build.query({
         query: () => ({
            url: `/api/cart`,
         }),
      }),
      updateCart: build.mutation({
         query: ({ cartId, values }) => ({
            url: `/api/cart/update/${cartId}`,
            method: "PUT",
            body: { ...values },
         }),
      }),
      deleteCart: build.mutation({
         query: ({ cartId }) => ({
            url: `/api/cart/delete/${cartId}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useAddCartMutation,
   useGetCartQuery,
   useGetCartsQuery,
   useUpdateCartMutation,
   useDeleteCartMutation
} = cartAPI;
