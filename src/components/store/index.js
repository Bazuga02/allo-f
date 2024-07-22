import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./mealsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    auth: authReducer,
  },
});
