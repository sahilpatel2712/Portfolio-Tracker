import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import loaderReducer from "./loader/loaderSlice";
import portfolioReducer from "./porfolio/portfolio";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      loader: loaderReducer,
      portfolio: portfolioReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
