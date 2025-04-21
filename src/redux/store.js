import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../services/reducers/products";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});
