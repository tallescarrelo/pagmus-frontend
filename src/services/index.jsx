import { configureStore } from "@reduxjs/toolkit";
import UserProducts from "./reducers/products";
import UserReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    user: UserReducer,
    products: UserProducts,
  },
});

export default store;
