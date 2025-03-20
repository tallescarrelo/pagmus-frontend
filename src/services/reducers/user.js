import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.token = null;
      state.name = null;
    },
  },
});

export const { updateUser, clearUser } = UserReducer.actions;

export const selectUser = (state) => state.user?.value;

export default UserReducer.reducer;
