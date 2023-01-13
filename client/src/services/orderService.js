import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const orderAPI = createApi({
   reducerPath: "orderAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      addOrder: build.mutation({
         query: ({ values }) => ({
            url: `/api/order/add`,
            method: "POST",
            body: { ...values },
         }),
         transformResponse: (response) => response.data,
      }),
      getOrder: build.query({
         query: ({ orderId }) => ({
            url: `/api/order/${orderId}`,
         }),
      }),
      getOrders: build.query({
         query: () => ({
            url: `/api/order`,
         }),
      }),
      updateOrder: build.mutation({
         query: ({ orderId, values }) => ({
            url: `/api/order/update/${orderId}`,
            method: "PUT",
            body: { ...values },
         }),
      }),
      deleteOrder: build.mutation({
         query: ({ orderId }) => ({
            url: `/api/order/delete/${orderId}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useAddOrderMutation,
   useGetOrderQuery,
   useGetOrdersQuery,
   useUpdateOrderMutation,
   useDeleteOrderMutation
} = orderAPI;
