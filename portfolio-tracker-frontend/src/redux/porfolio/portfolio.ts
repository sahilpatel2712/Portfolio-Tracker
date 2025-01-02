import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { setSpinner } from "../loader/loaderSlice";
import axios from "axios";
import { errorToast } from "../../utils/toast";
import { isValidArray } from "../../utils/objectsValidation";
import { StockDataType } from "../../components/StockTable";

const portfolio = createSlice({
  name: "portfolio",
  initialState: {
    stockData: [] as StockDataType[],
  },
  reducers: {
    setPortfolio: (state, action) => {
      state.stockData = action.payload;
    },
  },
});
const { setPortfolio } = portfolio.actions;

export const fetchPortfolio = (navigation: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL + "api/v1/stock/portfolio"}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (isValidArray(response.data.payload)) {
        dispatch(setPortfolio(response.data.payload));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(false));
  };
};

export default portfolio.reducer;
