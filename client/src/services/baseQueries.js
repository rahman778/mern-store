import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
});

const baseQueryWithAuthHeaders = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("AccessToken"));
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
// create a new mutex
const mutex = new Mutex();
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuthHeaders(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken =
      sessionStorage.getItem("RefreshToken") ||
      localStorage.getItem("RefreshToken");
    if (refreshToken) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQueryWithAuthHeaders(
            {
              url: "/api/auth/token/refresh/",
              method: "POST",
              body: {
                refresh: refreshToken,
              },
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            // save new access token
            sessionStorage.setItem(
              "AccessToken",
              refreshResult.data.data?.access
            );
            // retry the initial query
            result = await baseQueryWithAuthHeaders(args, api, extraOptions);
          } else {
            //window.location = "/signout";
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQueryWithAuthHeaders(args, api, extraOptions);
      }
    } else {
      //window.location = "/signout";
    }
  }
  return result;
};
