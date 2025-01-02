import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const { setLoading } = loaderSlice.actions;

export const setSpinner = (value: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(value));
  };
};

export default loaderSlice.reducer;
