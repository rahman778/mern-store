import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const userAPI = createApi({
   reducerPath: "userAPI",
   baseQuery: baseQueryWithReauth,
   entityTypes: ["Auth"],
   endpoints: (build) => ({
      getUser: build.query({
         query: () => ({
            url: `/api/user/me`,
         }),
         provides: ["Auth"],
      }),

      updateUser: build.mutation({
         query: ({ values }) => ({
            url: `/api/user/me`,
            method: "PUT",
            body: { ...values },
         }),
          provides: ["Auth"],
      }),
   }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userAPI;
