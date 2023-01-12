import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { addressAPI } from "./services/addressService";
import { authAPI } from "./services/authService";
import { cartAPI } from "./services/cartService";
import { orderAPI } from "./services/orderService";
import { productAPI } from "./services/productService";
import { userAPI } from "./services/userService";

const combinedReducer = combineReducers({
   [authAPI.reducerPath]: authAPI.reducer,
   [userAPI.reducerPath]: userAPI.reducer,
   [orderAPI.reducerPath]: orderAPI.reducer,
   [cartAPI.reducerPath]: cartAPI.reducer,
   [productAPI.reducerPath]: productAPI.reducer,
   [addressAPI.reducerPath]: addressAPI.reducer,
   // ... add your reducers here
});

// we structure store like this so that we can easily reset the store on logout.
const rootReducer = (state, action) => {
   if (action.type === "auth/logout") {
      state = undefined;
   }
   return combinedReducer(state, action);
};

export const store = configureStore({
   reducer: rootReducer,
   //add rtkq middleware to below aray
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(authAPI.middleware)
         .concat(userAPI.middleware)
         .concat(orderAPI.middleware)
         .concat(cartAPI.middleware)
         .concat(productAPI.middleware)
         .concat(addressAPI.middleware),
   devTools: true,
});
