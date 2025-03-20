import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/user';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
