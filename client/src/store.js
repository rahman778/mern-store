import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authAPI } from "./services/authService";

const combinedReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
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
      .concat(authAPI.middleware),
  devTools: true,
});
