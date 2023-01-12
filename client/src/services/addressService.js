import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const addressAPI = createApi({
   reducerPath: "addressAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      addAddress: build.mutation({
         query: ({ values }) => ({
            url: `/api/address/add`,
            method: "POST",
            body: { ...values },
         }),
      }),
      getAddress: build.query({
         query: ({ addressId }) => ({
            url: `/api/address/${addressId}`,
         }),
      }),
      updateAddress: build.mutation({
         query: ({ addressId, values }) => ({
            url: `/api/address/update/${addressId}`,
            method: "PUT",
            body: { ...values },
         }),
      }),
      deleteAddress: build.mutation({
         query: ({ addressId }) => ({
            url: `/api/address/delete/${addressId}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useAddAddressMutation,
   useGetAddressQuery,
   useUpdateAddressMutation,
   useDeleteAddressMutation,
} = addressAPI;
