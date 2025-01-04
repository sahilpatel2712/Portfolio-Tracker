import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, getStateType } from "../store";
import { setSpinner } from "../loader/loaderSlice";
import axios from "axios";
import { errorToast, successToast } from "../../utils/toast";
import { isValidArray, isValidObject } from "../../utils/objectsValidation";
import { StockDataType } from "../../components/StockTable";
import {
  findPortfolioSummary,
  updateStockChange,
} from "../../utils/stocksUtils";
import { StockFormType } from "../../schema/stockFormValidation";

export type portfolioSummaryType = {
  totalCurrentPrice: number | string;
  totalInvestment: number | string;
  difference: number | string;
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    stocksData: [] as StockDataType[],
    portfolioSummary: {
      totalCurrentPrice: 0,
      totalInvestment: 0,
      difference: 0,
    } as portfolioSummaryType,
  },
  reducers: {
    setPortfolio: (state, action) => {
      state.stocksData = action.payload.stocksData;
      state.portfolioSummary = action.payload.portfolioSummary;
    },
  },
});
const { setPortfolio } = portfolioSlice.actions;

export const fetchPortfolio = (navigation: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSpinner(1));
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
      if (isValidArray(response.data.payload.stocksData)) {
        const portfolioSummary = findPortfolioSummary(
          response.data.payload.stocksData
        );
        dispatch(
          setPortfolio({
            stocksData: response.data.payload.stocksData,
            portfolioSummary,
          })
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(-1));
  };
};

export const addStock = (
  data: StockFormType,
  navigation: (path: string) => void
) => {
  return async (dispatch: AppDispatch, getState: getStateType) => {
    dispatch(setSpinner(1));
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/v1/stock/add/`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (isValidObject(response.data.payload.stockData)) {
        const stocksData = getState().portfolio.stocksData;
        const newStocksData = [
          ...stocksData,
          response.data.payload.stockData,
        ];

        const portfolioSummary = findPortfolioSummary(newStocksData);
        dispatch(
          setPortfolio({
            stocksData: newStocksData,
            portfolioSummary,
          })
        );
        if (response.data.message) {
          successToast(response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(-1));
  };
};

export const updatePortfolio = (
  stockData: StockFormType,
  id: string,
  navigation: (path: string) => void
) => {
  return async (dispatch: AppDispatch, getState: getStateType) => {
    dispatch(setSpinner(1));
    if (!id.trim()) {
      errorToast("Stock id not provided");
      return;
    }
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}api/v1/stock/update/${id}`,
        stockData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (isValidObject(response.data.payload.updatedStock)) {
        const stocksData = getState().portfolio.stocksData;
        const newStocksData = updateStockChange(
          stocksData,
          response.data.payload.updatedStock
        );

        const portfolioSummary = findPortfolioSummary(newStocksData);
        dispatch(
          setPortfolio({
            stocksData: newStocksData,
            portfolioSummary,
          })
        );
        if (response.data.message) {
          successToast(response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(-1));
  };
};
export const deleteStock = (id: string, navigation: (path: string) => void) => {
  return async (dispatch: AppDispatch, getState: getStateType) => {
    dispatch(setSpinner(1));
    if (!id.trim()) {
      errorToast("Stock id not provided");
      return;
    }
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}api/v1/stock/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.payload.id) {
        const stocksData = getState().portfolio.stocksData;
        const newStocksData = stocksData.filter(
          (stock) => stock.id !== response.data.payload.id
        );

        const portfolioSummary = findPortfolioSummary(newStocksData);
        dispatch(
          setPortfolio({
            stocksData: newStocksData,
            portfolioSummary,
          })
        );
        if (response.data.message) {
          successToast(response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(-1));
  };
};

export default portfolioSlice.reducer;
